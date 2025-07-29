import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MetodoPago } from './entities/metodos-pago.entity';

@Injectable()
export class MetodosPagoService {
  constructor(
    @InjectRepository(MetodoPago)
    private readonly metodosPagoRepository: Repository<MetodoPago>,
  ) {}

  async getAllMetodosPago(page: number, limit: number) {
    const [data, total] = await this.metodosPagoRepository.findAndCount({
      where: { estado: 1 },
      skip: (page - 1) * limit,
      take: limit,
    });
    return {
      data,
      total,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
    };
  }

  async getMetodoPago(idMetodoPago: number) {
    return this.metodosPagoRepository.findOne({
      where: { idMetodoPago, estado: 1 },
    });
  }

  async createMetodoPago(dto: Partial<MetodoPago>) {
    const nuevoMetodo = this.metodosPagoRepository.create(dto);
    return await this.metodosPagoRepository.save(nuevoMetodo);
  }

  async updateMetodoPago(idMetodoPago: number, dto: Partial<MetodoPago>) {
    const result = await this.metodosPagoRepository.update({ idMetodoPago }, dto);
    if (result.affected === 0) {
      throw new NotFoundException(`Método de pago con ID ${idMetodoPago} no encontrado`);
    }
    return this.getMetodoPago(idMetodoPago);
  }

  async deleteMetodoPago(idMetodoPago: number) {
    const result = await this.metodosPagoRepository.update(
      { idMetodoPago },
      { estado: 0 },
    );
    if (result.affected === 0) {
      throw new NotFoundException(`Método de pago con ID ${idMetodoPago} no encontrado`);
    }
    return { message: 'Método de pago eliminado correctamente (borrado lógico)' };
  }
}
