import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Stock } from './entities/stock.entity';
import { CreateStockDto } from './dto/create-stock.dto';
import { UpdateStockDto } from './dto/update-stock.dto';
import { Lote } from '../lotes/entities/lote.entity';

@Injectable()
export class StockService {
  async getTotalStockProducto(idProducto: number) {
    // Suma el stock de todos los lotes activos para el producto
    const total = await this.repo
      .createQueryBuilder('stock')
      .select('SUM(stock.cantidadStock)', 'totalStock')
      .where('stock.producto = :idProducto', { idProducto })
      .andWhere('stock.estado = :estado', { estado: true })
      .getRawOne();
    return {
      idProducto,
      totalStock: Number(total?.totalStock || 0)
    };
  }
  constructor(
    @InjectRepository(Stock)
    private readonly repo: Repository<Stock>,
    //inyecto el repositorio de lote para validar si esta activo
    @InjectRepository(Lote)
    private readonly loteRepo: Repository<Lote>,
  ) {}

  async getAll(page: number, limit: number) {
    const query = this.repo
      .createQueryBuilder('stock')
      .leftJoinAndSelect('stock.producto', 'producto')
      .leftJoinAndSelect('stock.lote', 'lote')
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
    //incluimos 'relations: ['lote']' 
    //para traer los datos del lote para mas adelante
    const stock = await this.repo.findOne({
      where: { idStock: id },
      relations: ['lote'],
    });
    if (!stock || !stock.estado) {
      throw new NotFoundException(`Stock ${id} no disponible o está desactivado`);
    }
    return stock;
  }

  async create(dto: CreateStockDto) {
    //valida que el lote exista y este activo antes de crear el stock
    const lote = await this.loteRepo.findOneBy({ idLote: dto.idLote });
    if (!lote || !lote.estado) {
      throw new NotFoundException(`El lote ${dto.idLote} no existe o está desactivado`);
    }

    // asociamos el lote directamente como relación
    const stock = this.repo.create({
      ...dto,
      lote,
    });
    return this.repo.save(stock);
  }

  async update(id: number, dto: UpdateStockDto) {
    // obtenemos el stock con la relacion lote para posibles validaciones
    const stock = await this.repo.findOne({
      where: { idStock: id },
      relations: ['lote'],
    });

    if (!stock || !stock.estado) {
      throw new NotFoundException(`No se puede actualizar el stock ${id} porque está desactivado o no existe`);
    }

    //validamos lote solo si el DTO incluye un nuevo idLote
    if (dto.idLote) {
      const lote = await this.loteRepo.findOneBy({ idLote: dto.idLote });
      if (!lote || !lote.estado) {
        throw new NotFoundException(`El lote ${dto.idLote} no existe o está desactivado`);
      }
      stock.lote = lote;
    }
    //actualiza campos con Object.assign
    Object.assign(stock, dto);
    return this.repo.save(stock);
  }

  async delete(id: number) {
    const result = await this.repo.update(id, { estado: false });
    if (result.affected === 0) {
      throw new NotFoundException(`El stock ${id} ya está inactivo o no existe`);
    }
    return { message: 'Stock desactivado correctamente' };
  }
}
