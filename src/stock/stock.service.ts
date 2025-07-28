import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Stock } from './entities/stock.entity';
import { CreateStockDto } from './dto/create-stock.dto';
import { UpdateStockDto } from './dto/update-stock.dto';

@Injectable()
export class StockService {
  constructor(
    @InjectRepository(Stock)
    private readonly repo: Repository<Stock>,
  ) {}

  async getAll(page: number, limit: number) {
    const query = this.repo
      .createQueryBuilder('stock')
      .where('stock.estado = :estado', { estado: true });

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
    const stock = await this.repo.findOneBy({ idStock: id });
    if (!stock || !stock.estado) {
      throw new NotFoundException(`Stock ${id} no disponible o está desactivado`);
    }
    return stock;
  }

  async create(dto: CreateStockDto) {
    const stock = this.repo.create(dto);
    return this.repo.save(stock);
  }

  async update(id: number, dto: UpdateStockDto) {
    const stock = await this.repo.findOneBy({ idStock: id });
    if (!stock || !stock.estado) {
      throw new NotFoundException(`No se puede actualizar el stock ${id} porque está desactivado o no existe`);
    }

    Object.assign(stock, dto);
    return this.repo.save(stock);
  }

  async delete(id: number) {
    const stock = await this.repo.findOneBy({ idStock: id });
    if (!stock || !stock.estado) {
      throw new NotFoundException(`El stock ${id} ya está inactivo o no existe`);
    }

    stock.estado = false;
    return this.repo.save(stock);
  }
}
