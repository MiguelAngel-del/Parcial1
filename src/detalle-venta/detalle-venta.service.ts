import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateDetalleVentaDto } from './dto/create-detalle-venta.dto';
import { UpdateDetalleVentaDto } from './dto/update-detalle-venta.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DetalleVenta } from './entities/detalle-venta.entity';

@Injectable()
export class DetalleVentaService {
  constructor(
    @InjectRepository(DetalleVenta)
    private detalleVentaRepository: Repository<DetalleVenta>,
  ) {}

  async getAllDetalleVenta(page: number, limit: number) {
    const [data, total] = await this.detalleVentaRepository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
      relations: ['venta', 'producto'],
    });
    const totalPages = Math.ceil(total / limit);
    return { 
      data, 
      total, 
      currentPage: page,
      totalPages 
    };
  }

  async getDetalleVenta(idDetalleVenta: number) {
    const detalle = await this.detalleVentaRepository.findOne({
      where: { idDetalleVenta },
      relations: ['venta', 'producto'],
    });
    if (!detalle) {
      throw new NotFoundException(`Detalle de venta con ID ${idDetalleVenta} no encontrado`);
    }
    return detalle;
  }

  async createDetalleVenta(dto: CreateDetalleVentaDto) {
    const newDetalle = this.detalleVentaRepository.create({
      ...dto,
      venta: { idVenta: dto.idVenta },
      producto: { idProducto: dto.idProducto },
    });
    return await this.detalleVentaRepository.save(newDetalle);
  }

  async updateDetalleVenta(idDetalleVenta: number, dto: UpdateDetalleVentaDto) {
    const result = await this.detalleVentaRepository.update({ idDetalleVenta }, dto);
    if (result.affected === 0) {
      throw new NotFoundException(`Detalle de venta con ID ${idDetalleVenta} no encontrado`);
    }
    return this.getDetalleVenta(idDetalleVenta);
  }

  async deleteDetalleVenta(idDetalleVenta: number) {
    const result = await this.detalleVentaRepository.update(
      { idDetalleVenta },
      { cantidadVenta: 0 },
    );
    if (result.affected === 0) {
      throw new NotFoundException(`Detalle de venta con ID ${idDetalleVenta} no encontrado`);
    }
    return { message: 'Detalle de venta eliminado correctamente' };
  }
}
