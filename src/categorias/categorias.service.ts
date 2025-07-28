import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Categoria } from './entities/categoria.entity';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { UpdateCategoriaDto } from './dto/update-categoria.dto';

@Injectable()
export class CategoriasService {
  constructor(
    @InjectRepository(Categoria)
    private readonly repo: Repository<Categoria>,
  ) {}

  async getAll(page: number, limit: number) {
    const query = this.repo
      .createQueryBuilder('categoria')
      .where('categoria.estado = :estado', { estado: true });

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
    const categoria = await this.repo.findOne({
      where: { idCategoria: id },
    });

    if (!categoria || !categoria.estado) {
      throw new NotFoundException(`La categoría ${id} no existe o está desactivada`);
    }

    return categoria;
  }

  async create(dto: CreateCategoriaDto) {
    const existing = await this.repo.findOneBy({ nombreCategoria: dto.nombreCategoria.trim() });

    if (existing) {
      throw new BadRequestException(`Ya existe una categoría con el nombre "${dto.nombreCategoria}"`);
    }

    const categoria = this.repo.create(dto);
    return this.repo.save(categoria);
  }

  async update(id: number, dto: UpdateCategoriaDto) {
    const categoria = await this.repo.findOneBy({ idCategoria: id });

    if (!categoria) {
      throw new NotFoundException(`Categoría ${id} no encontrada`);
    }

    Object.assign(categoria, dto);
    return this.repo.save(categoria);
  }

  async delete(id: number) {
    const categoria = await this.repo.findOneBy({ idCategoria: id });

    if (!categoria || !categoria.estado) {
      throw new NotFoundException(`La categoría ${id} no está activa o ya fue desactivada`);
    }

    categoria.estado = false;
    return this.repo.save(categoria);
  }
}
