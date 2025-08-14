import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCompraDto } from './dto/create-compra.dto';
import { CreateDetalleCompraDto } from './dto/create-detalle-compra.dto';
import { DetalleCompra } from './entities/detalle-compra.entity';
import { Producto } from '../productos/entities/producto.entity';
import { Stock } from '../stock/entities/stock.entity';
import { Lote } from '../lotes/entities/lote.entity';
import { UpdateCompraDto } from './dto/update-compra.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Compra } from './entities/compra.entity';
import { Repository, Between } from 'typeorm';

@Injectable()
export class ComprasService {
  constructor(
    @InjectRepository(Compra)
    private readonly comprasRepository: Repository<Compra>,
    @InjectRepository(DetalleCompra)
    private readonly detalleCompraRepository: Repository<DetalleCompra>,
    @InjectRepository(Producto)
    private readonly productoRepository: Repository<Producto>,
    @InjectRepository(Stock)
    private readonly stockRepository: Repository<Stock>,
    @InjectRepository(Lote)
    private readonly loteRepository: Repository<Lote>,
  ) {}

  async getAllCompras(page: number, limit: number) {
    const queryBuilder = this.comprasRepository
      .createQueryBuilder('compra')
      .leftJoinAndSelect('compra.proveedor', 'proveedor')
      .leftJoinAndSelect('compra.usuario', 'usuario')
  .leftJoinAndSelect('compra.detalles', 'detalles')
  .leftJoinAndSelect('detalles.producto', 'producto')
  .leftJoinAndSelect('detalles.lote', 'lote')
      .where('compra.estado = :estado', { estado: 1 });

    const total = await queryBuilder.getCount();
    const compras = await queryBuilder
      .skip((page - 1) * limit)
      .take(limit)
      .getMany();

    const totalPages = Math.ceil(total / limit);

    return {
      data: compras,
      total,
      currentPage: page,
      totalPages,
    };
  }

  async getCompra(idCompra: number) {
    const compra = await this.comprasRepository.findOne({
      where: { idCompra },
      relations: ['proveedor', 'usuario', 'detalles', 'detalles.producto'],
    });
    if (!compra) {
      throw new NotFoundException(`Compra con ID ${idCompra} no encontrada`);
    }
    return compra;
  }

  async createCompra(dto: CreateCompraDto) {
    // Usar transacción para integridad
    return await this.comprasRepository.manager.transaction(async manager => {
      // Crear la compra (encabezado)
      const compra = this.comprasRepository.create({
        totalCompra: dto.totalCompra,
        proveedor: { idProveedor: dto.idProveedor } as any,
        usuario: { idUsuario: dto.idUsuario } as any,
      });
      const savedCompra = await manager.save(compra);

      // Crear los detalles, lotes y actualizar stock
      const detalles: DetalleCompra[] = [];
      let totalCompra = 0;
      for (const det of dto.detalles) {
        // Validar producto
        const producto = await manager.findOne(Producto, { where: { idProducto: det.idProducto } });
        if (!producto) {
          throw new NotFoundException(`Producto con ID ${det.idProducto} no encontrado`);
        }

        // Crear lote específico para este detalle
        let lote = manager.create(Lote, {
          producto,
          numeroLote: det.numeroLote,
          fechaVencimiento: det.fechaVencimiento,
          estado: true,
        });
        lote = await manager.save(lote);

        // Buscar stock existente para producto y lote
        let stock = await manager.findOne(Stock, { where: { producto: { idProducto: producto.idProducto }, lote: { idLote: lote.idLote } } });
        if (stock) {
          stock.cantidadStock += det.cantidad;
        } else {
          stock = manager.create(Stock, {
            producto,
            lote,
            cantidadStock: det.cantidad,
            estado: true,
          });
        }
        await manager.save(stock);

        // Asociar el lote al detalle
        const subtotal = det.cantidad * det.precioUnitario;
        totalCompra += subtotal;
        const detalle = this.detalleCompraRepository.create({
          compra: savedCompra,
          producto,
          lote,
          cantidadCompra: det.cantidad,
          precioUnitarioCompra: det.precioUnitario,
          subtotalCompra: subtotal,
        });
        const savedDetalle = await manager.save(detalle);
        detalles.push({ ...savedDetalle, lote });
      }

  // Ya se guardaron los detalles individualmente, no es necesario volver a guardar el array

      // Actualizar el total de la compra en la base de datos
      await manager.update(Compra, savedCompra.idCompra, { totalCompra });

      // Retornar la compra con detalles, producto y lote
      return await manager.findOne(Compra, {
        where: { idCompra: savedCompra.idCompra },
        relations: ['proveedor', 'usuario', 'detalles', 'detalles.producto', 'detalles.lote'],
      });
    });
  }

  async updateCompra(idCompra: number, dto: UpdateCompraDto) {
    const updateData: any = { ...dto };
    if (dto.idProveedor !== undefined) {
      updateData.idProveedor = { idProveedor: dto.idProveedor };
    }
    if (dto.idUsuario !== undefined) {
      updateData.idUsuario = { idUsuario: dto.idUsuario };
    }
    const result = await this.comprasRepository.update({ idCompra }, updateData);
    if (result.affected === 0) {
      throw new NotFoundException(`Compra con ID ${idCompra} no encontrada`);
    }
    return this.getCompra(idCompra);
  }

  async deleteCompra(idCompra: number) {
    const result = await this.comprasRepository.update(
      { idCompra },
      { estado: 0 },
    );
    if (result.affected === 0) {
      throw new NotFoundException(`Compra con ID ${idCompra} no encontrada`);
    }
    return { message: `Compra con ID ${idCompra} eliminada correctamente` };
  }

  async getComprasPorFechas(fechaInicio: Date, fechaFin: Date) {
    return await this.comprasRepository.find({
      where: {
        fechaCompra: Between(fechaInicio, fechaFin),
        estado: 1,
      },
      relations: ['proveedor', 'usuario', 'detalles', 'detalles.producto'],
    });
  }
}
