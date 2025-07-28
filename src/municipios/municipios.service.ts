import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Municipio } from './entities/municipio.entity';

@Injectable()
export class MunicipiosService {
  constructor(
    @InjectRepository(Municipio)
    private readonly municipioRepository: Repository<Municipio>,
  ) {}

  async getAllMunicipios(page: number, limit: number) {
    const [data, total] = await this.municipioRepository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
      relations: ['departamento', 'proveedores'],
    });
    return {
      data,
      total,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
    };
  }

  async getMunicipio(idMunicipio: number) {
    return this.municipioRepository.findOne({
      where: { idMunicipio },
      relations: ['departamento', 'proveedores'],
    });
  }
}
