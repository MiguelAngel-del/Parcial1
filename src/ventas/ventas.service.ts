import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateVentaDto } from './dto/create-venta.dto';
import { UpdateVentaDto } from './dto/update-venta.dto';
import { Venta } from './entities/venta.entity';
import { Repository, Between } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Producto } from '../productos/entities/producto.entity';

@Injectable()
export class VentasService {
  constructor(
    @InjectRepository(Venta)
    private ventaRepository: Repository<Venta>,
    @InjectRepository(Producto)
    private productoRepository: Repository<Producto>,
  ) {}
  async getAllVentas(page: number, limit: number) {
    const [data, total] = await this.ventaRepository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
      relations: [
        'metodoPago',
        'cliente',
        'usuario',
      ],
    });
    return {
      data,
      total,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
    };
  }

  async getVenta(idVenta: number) {
    const venta = await this.ventaRepository.findOne({
      where: { idVenta },
      relations: [
        'metodoPago',
        'cliente',
        'usuario',
      ],
    });
    if (!venta) {
      throw new NotFoundException(`Venta con ID ${idVenta} no encontrada`);
    }
    return venta;
  }

  async createVenta(dto: CreateVentaDto) {
    // Procesar detalles para obtener precio y calcular subtotal
    const detallesProcesados = await Promise.all(
      dto.detalles.map(async (det) => {
        const producto = await this.productoRepository.findOne({ where: { idProducto: det.idProducto } });
        if (!producto) throw new NotFoundException(`Producto con ID ${det.idProducto} no encontrado`);
        const precioUnitarioVenta = producto.precioVenta;
        const subtotalVenta = precioUnitarioVenta * det.cantidadVenta;
        return {
          cantidadVenta: det.cantidadVenta,
          precioUnitarioVenta,
          descuentoAplicado: det.descuentoAplicado ?? 0,
          subtotalVenta,
          producto,
        };
      })
    );
    const newVenta = this.ventaRepository.create({
      ...dto,
      cliente: { idCliente: dto.idCliente },
      usuario: { idUsuario: dto.idUsuario },
      metodoPago: { idMetodoPago: dto.idMetodoPago },
      detalles: detallesProcesados,
    });
    const ventaGuardada = await this.ventaRepository.save(newVenta);

    // Descontar stock FIFO por cada detalle vendido
    const stockRepo = this.ventaRepository.manager.getRepository('Stock');
    for (const det of detallesProcesados) {
      let cantidadRestante = det.cantidadVenta;
      // Buscar lotes activos y ordenados por fecha de vencimiento ascendente
      const lotesStock = await stockRepo.createQueryBuilder('stock')
        .leftJoinAndSelect('stock.lote', 'lote')
        .where('stock.producto = :idProducto', { idProducto: det.producto.idProducto })
        .andWhere('stock.estado = :estado', { estado: true })
        .orderBy('lote.fechaVencimiento', 'ASC')
        .getMany();
      for (const stock of lotesStock) {
        if (cantidadRestante <= 0) break;
        if (stock.cantidadStock >= cantidadRestante) {
          stock.cantidadStock -= cantidadRestante;
          cantidadRestante = 0;
        } else {
          cantidadRestante -= stock.cantidadStock;
          stock.cantidadStock = 0;
        }
        await stockRepo.save(stock);
      }
      if (cantidadRestante > 0) {
        throw new NotFoundException(`No hay suficiente stock para el producto ${det.producto.nombreProducto}`);
      }
    }
    return ventaGuardada;
  }

  async updateVenta(idVenta: number, dto: UpdateVentaDto) {
    const result = await this.ventaRepository.update({ idVenta }, dto);
    if (result.affected === 0) {
      throw new NotFoundException(`Venta con ID ${idVenta} no encontrada`);
    }
    return this.getVenta(idVenta);
  }

  async deleteVenta(idVenta: number) {
    const result = await this.ventaRepository.update(
      { idVenta },
      { estado: 0 },
    );
    if (result.affected === 0) {
      throw new NotFoundException(`Venta con ID ${idVenta} no encontrada`);
    }
    return { message: 'Venta eliminada correctamente' };
  }

  async getVentasPorFechas(fechaInicio: Date, fechaFin: Date) {
    return await this.ventaRepository.find({
      where: {
        createdAt: Between(fechaInicio, fechaFin),
        estado: 1,
      },
      relations: [
        'cliente',
        'usuario',
        'metodoPago',
        'detalles',
        'detalles.producto',
      ],
    });
  }
}
