import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Producto } from './entities/producto.entity';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';
import { Categoria } from '../categorias/entities/categoria.entity';
import { StockService } from '../stock/stock.service';

@Injectable()
export class ProductosService {
  constructor(
    @InjectRepository(Producto)
    private readonly repo: Repository<Producto>,
    @InjectRepository(Categoria)
    private readonly categoriaRepo: Repository<Categoria>,
    private readonly stockService: StockService,
  ) {}
  async getProductosConStockMinimo() {
    const productos = await this.repo.find({ where: { estado: true } });
    const alertas = [];
    for (const producto of productos) {
      if (producto.cantidadMinima != null) {
        const totalStock = await this.stockService.getTotalStockProducto(producto.idProducto);
        if (totalStock.totalStock <= producto.cantidadMinima) {
          alertas.push({
            idProducto: producto.idProducto,
            nombreProducto: producto.nombreProducto,
            stockActual: totalStock.totalStock,
            cantidadMinima: producto.cantidadMinima
          });
        }
      }
    }
    return alertas;
  }

  async getAll(page: number, limit: number) {
    const query = this.repo
      .createQueryBuilder('producto')
      .leftJoinAndSelect('producto.categoria', 'categoria')
      .where('producto.estado = :estado', { estado: true });

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
    const producto = await this.repo.findOne({
      where: { idProducto: id },
      relations: ['categoria'],
    });

    if (!producto || !producto.estado || !producto.categoria?.estado) {
      throw new NotFoundException(`Producto ${id} no disponible`);
    }

    return producto;
  }

  async create(dto: CreateProductoDto) {
    const categoria = await this.categoriaRepo.findOneBy({ idCategoria: dto.categoriaId });

    if (!categoria || !categoria.estado) {
      throw new NotFoundException(
        `La categoría ${dto.categoriaId} no existe o está desactivada`,
      );
    }

    const producto = this.repo.create({
      ...dto,
      categoria,
    });

    return this.repo.save(producto);
  }

  async update(id: number, dto: UpdateProductoDto) {
  const producto = await this.getOne(id);

  if (dto.categoriaId) {
    const categoria = await this.categoriaRepo.findOneBy({ idCategoria: dto.categoriaId });

    if (!categoria || !categoria.estado) {
      throw new NotFoundException(
        `La categoría ${dto.categoriaId} no existe o está desactivada`,
      );
    }

    producto.categoria = categoria;
  }

  Object.assign(producto, dto);
  return this.repo.save(producto);
  }

  async delete(id: number) {
    const result = await this.repo.update(id, { estado: false });
    if (result.affected === 0) {
      throw new NotFoundException(`Producto ${id} no encontrado`);
    }
    return { message: 'Producto desactivado' };
  }
}
