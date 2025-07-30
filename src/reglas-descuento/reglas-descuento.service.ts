import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateReglasDescuentoDto } from './dto/create-reglas-descuento.dto';
import { UpdateReglasDescuentoDto } from './dto/update-reglas-descuento.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ReglasDescuento } from './entities/reglas-descuento.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ReglasDescuentoService {

  constructor(
    @InjectRepository(ReglasDescuento)
    private reglasRepository: Repository<ReglasDescuento>,
  ) {}

  async getAllReglasDescuento(page: number, limit: number) {
    const queryBuilder = this.reglasRepository
    .createQueryBuilder('regla')
    .where('regla.estado = :estado', { estado: 1 })

    const total = await queryBuilder.getCount();
    const reglas = await queryBuilder
      .skip((page - 1) * limit)
      .take(limit)
      .getMany();

    const totalPages = Math.ceil(total / limit);

    return {
      data: reglas,
      total,
      currentPage: page,
      totalPages,
    }
  }

  async getReglaDescuento(idRegla: number) {
    const regla = await this.reglasRepository.findOneBy({ idRegla });
    if (!regla) {
      throw new NotFoundException(`Regla de descuento con ID ${idRegla} no encontrada`);
    }
    return regla;
  }
  
  async createReglaDescuento(dto: CreateReglasDescuentoDto) {
    const newRegla = this.reglasRepository.create(dto);
    return await this.reglasRepository.save(newRegla);
  }

  async updateReglaDescuento(idRegla: number, dto: UpdateReglasDescuentoDto) {
    const result = await this.reglasRepository.update({ idRegla }, dto);
    if (result.affected === 0) {
      throw new NotFoundException(`Regla de descuento con ID ${idRegla} no encontrada`);
    }
    return this.getReglaDescuento(idRegla);
  }

  async deleteReglaDescuento(idRegla: number) {
    const result = await this.reglasRepository.update(
      { idRegla },
      { estado: 0 }, 
    );
    if (result.affected === 0) {
      throw new NotFoundException(`Regla de descuento con ID ${idRegla} no encontrada`);
    }
    return { message: `Regla de descuento con ID ${idRegla} eliminada correctamente` };
  }
}
