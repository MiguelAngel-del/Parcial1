import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateVentaDto } from './dto/create-venta.dto';
import { UpdateVentaDto } from './dto/update-venta.dto';
import { Venta } from './entities/venta.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class VentasService {
  constructor(
    @InjectRepository(Venta)
    private ventaRepository: Repository<Venta>,
  ) {}
  async getAllVentas(page: number, limit: number) {
    const [data, total] = await this.ventaRepository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
      relations: [
        'metodoPago',
        // 'cliente',
        // 'usuario',
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
        // 'cliente',
        // 'usuario',
      ],
    });
    if (!venta) {
      throw new NotFoundException(`Venta con ID ${idVenta} no encontrada`);
    }
    return venta;
  }

  async createVenta(dto: CreateVentaDto) {
    const newVenta = this.ventaRepository.create({
      ...dto,
      // cliente: { idCliente: dto.idCliente },
      // usuario: { idUsuario: dto.idUsuario },
      metodoPago: { idMetodoPago: dto.idMetodoPago },
    });
    return await this.ventaRepository.save(newVenta);
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
}
