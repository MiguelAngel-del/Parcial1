import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Departamento } from './entities/departamento.entity';

@Injectable()
export class DepartamentosService {
  constructor(
    @InjectRepository(Departamento)
    private readonly departamentoRepository: Repository<Departamento>,
  ) {}

  async getAllDepartamentos(page: number, limit: number) {
    const [data, total] = await this.departamentoRepository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
      relations: ['municipios'],
    });
    return {
      data,
      total,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
    };
  }

  async getDepartamento(idDepartamento: number) {
    return this.departamentoRepository.findOne({
      where: { idDepartamento },
      relations: ['municipios'],
    });
  }
}
