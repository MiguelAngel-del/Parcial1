import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DetalleCompra } from '../compras/entities/detalle-compra.entity';
import { Stock } from '../stock/entities/stock.entity';
import { CreateDetalleCompraSimpleDto } from './dto/create-detalle-compra.dto';
import { UpdateDetalleCompraDto } from './dto/update-detalle-compra.dto';

@Injectable()
export class DetalleCompraService {
  constructor(
    @InjectRepository(DetalleCompra)
    private readonly detalleCompraRepository: Repository<DetalleCompra>,
  ) {}

  async create(dto: CreateDetalleCompraSimpleDto) {
    const detalle = this.detalleCompraRepository.create({
      ...dto,
      compra: { idCompra: dto.idCompra },
      producto: { idProducto: dto.idProducto },
    });
    return this.detalleCompraRepository.save(detalle);
  }

  async findAll(page: number, limit: number) {
    const [data, total] = await this.detalleCompraRepository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
      relations: ['compra', 'producto'],
    });
    return {
      data,
      total,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
    };
  }

  async findOne(id: number) {
    const detalle = await this.detalleCompraRepository.findOne({
      where: { idDetalleCompra: id },
      relations: ['compra', 'producto'],
    });
    if (!detalle) throw new NotFoundException('Detalle de compra no encontrado');
    return detalle;
  }

  async update(id: number, dto: UpdateDetalleCompraDto) {
    // Buscar el detalle actual
    const detalle = await this.detalleCompraRepository.findOne({
      where: { idDetalleCompra: id, estado: 1 },
      relations: ['producto', 'compra'],
    });
    if (!detalle) throw new NotFoundException('Detalle de compra no encontrado o inactivo');

    // Si cambia la cantidad, ajustar el stock
    if (dto.cantidadCompra !== undefined && dto.cantidadCompra !== detalle.cantidadCompra) {
      // Buscar stock correspondiente usando la relación lote
      if (!detalle.lote) throw new NotFoundException('No se encontró el lote asociado al detalle');
      const stock = await this.detalleCompraRepository.manager.findOne(Stock, {
        where: { producto: { idProducto: detalle.producto.idProducto }, lote: { idLote: detalle.lote.idLote } },
      });
      if (stock) {
        stock.cantidadStock = stock.cantidadStock - detalle.cantidadCompra + dto.cantidadCompra;
        await this.detalleCompraRepository.manager.save(Stock, stock);
      }
    }

    // Actualizar campos
    const updateData: any = { ...dto };
    if (dto.idCompra !== undefined) {
      updateData.compra = { idCompra: dto.idCompra };
      delete updateData.idCompra;
    }
    if (dto.idProducto !== undefined) {
      updateData.producto = { idProducto: dto.idProducto };
      delete updateData.idProducto;
    }
    await this.detalleCompraRepository.update({ idDetalleCompra: id }, updateData);
    return this.findOne(id);
  }

  async deleteDetalleCompra(idDetalleCompra: number) {
    // Buscar el detalle actual
    const detalle = await this.detalleCompraRepository.findOne({
      where: { idDetalleCompra, estado: 1 },
      relations: ['producto', 'compra'],
    });
    if (!detalle) throw new NotFoundException('Detalle de compra no encontrado o inactivo');
    // Ajustar stock (restar la cantidad de este detalle)
    if (!detalle.lote) throw new NotFoundException('No se encontró el lote asociado al detalle');
    const stock = await this.detalleCompraRepository.manager.findOne(Stock, {
      where: { producto: { idProducto: detalle.producto.idProducto }, lote: { idLote: detalle.lote.idLote } },
    });
    if (stock) {
      stock.cantidadStock -= detalle.cantidadCompra;
      await this.detalleCompraRepository.manager.save(Stock, stock);
    }
    // Borrado lógico
    detalle.estado = 0;
    await this.detalleCompraRepository.save(detalle);
    return { message: `Detalle de compra con ID ${idDetalleCompra} eliminado lógicamente y stock ajustado` };
  }

  async remove(id: number) {
    const result = await this.detalleCompraRepository.delete({ idDetalleCompra: id });
    if (result.affected === 0) throw new NotFoundException('Detalle de compra no encontrado');
    return { message: 'Detalle de compra eliminado correctamente' };
  }
}
