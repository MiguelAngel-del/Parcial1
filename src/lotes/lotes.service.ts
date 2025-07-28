import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Lote } from './entities/lote.entity';
import { CreateLoteDto } from './dto/create-lote.dto';
import { UpdateLoteDto } from './dto/update-lote.dto';

@Injectable()
export class LotesService {
  constructor(
    @InjectRepository(Lote)
    private readonly repo: Repository<Lote>,
  ) {}

  async getAll(page: number, limit: number) {
    const query = this.repo
      .createQueryBuilder('lote')
      .where('lote.estado = :estado', { estado: true });

    const total = await query.getCount();
    const data = await query
      .skip((page - 1) * limit)
      .take(limit)
      .getMany();

    return {
      data,
      total,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
    };
  }

  async getOne(id: number) {
    const lote = await this.repo.findOneBy({ idLote: id });
    if (!lote || !lote.estado) {
      throw new NotFoundException(`Lote ${id} no disponible o está desactivado`);
    }
    return lote;
  }

  async create(dto: CreateLoteDto) {
    const lote = this.repo.create(dto);
    return this.repo.save(lote);
  }

  async update(id: number, dto: UpdateLoteDto) {
    const lote = await this.repo.findOneBy({ idLote: id });

    if (!lote || !lote.estado) {
      throw new NotFoundException(`Lote ${id} no se puede actualizar porque está desactivado o no existe`);
    }

    Object.assign(lote, dto);
    return this.repo.save(lote);
  }

  async delete(id: number) {
    const lote = await this.repo.findOne({
      where: { idLote: id },
      relations: ['stocks'],
    });

    if (!lote || !lote.estado) {
      throw new NotFoundException(`Lote ${id} no se puede desactivar porque ya está inactivo o no existe`);
    }

    const hasStockActivo = lote.stocks?.some(stock => stock.estado === true);

    if (hasStockActivo) {
      throw new BadRequestException(`El lote ${id} tiene stock activo. No se puede desactivar`);
    }

    lote.estado = false;
    return this.repo.save(lote);
  }
}
