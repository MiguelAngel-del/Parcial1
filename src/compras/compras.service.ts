import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCompraDto } from './dto/create-compra.dto';
import { UpdateCompraDto } from './dto/update-compra.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Compra } from './entities/compra.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ComprasService {
  constructor(
    @InjectRepository(Compra)
    private readonly comprasRepository: Repository<Compra>,
  ) {}

  async getAllCompras(page: number, limit: number) {
    const queryBuilder = this.comprasRepository
      .createQueryBuilder('compra')
      .leftJoinAndSelect('compra.idProveedor', 'proveedor')
      .leftJoinAndSelect('compra.idUsuario', 'usuario')
      .where('compra.estado = :estado', { estado: 1 });

    const total = await queryBuilder.getCount();
    const compras = await queryBuilder
      .skip((page - 1) * limit)
      .take(limit)
      .getMany();

    const totalPages = Math.ceil(total / limit);

    return {
      data: compras,
      total,
      currentPage: page,
      totalPages,
    };
  }

  async getCompra(idCompra: number) {
    const compra = await this.comprasRepository.findOne({
      where: { idCompra },
      relations: ['idProveedor', 'idUsuario'],
    });
    if (!compra) {
      throw new NotFoundException(`Compra con ID ${idCompra} no encontrada`);
    }
    return compra;
  }

  async createCompra(dto: CreateCompraDto) {
    const nuevaCompra = this.comprasRepository.create({
      ...dto,
      proveedor: { idProveedor: dto.idProveedor } as any,
      idUsuario: { idUsuario: dto.idUsuario } as any,
    });
    return await this.comprasRepository.save(nuevaCompra);
  }

  async updateCompra(idCompra: number, dto: UpdateCompraDto) {
    const updateData: any = { ...dto };
    if (dto.idProveedor !== undefined) {
      updateData.idProveedor = { idProveedor: dto.idProveedor };
    }
    if (dto.idUsuario !== undefined) {
      updateData.idUsuario = { idUsuario: dto.idUsuario };
    }
    const result = await this.comprasRepository.update({ idCompra }, updateData);
    if (result.affected === 0) {
      throw new NotFoundException(`Compra con ID ${idCompra} no encontrada`);
    }
    return this.getCompra(idCompra);
  }

  async deleteCompra(idCompra: number) {
    const result = await this.comprasRepository.update(
      { idCompra },
      { estado: 0 },
    );
    if (result.affected === 0) {
      throw new NotFoundException(`Compra con ID ${idCompra} no encontrada`);
    }
    return { message: `Compra con ID ${idCompra} eliminada correctamente` };
  }
}
