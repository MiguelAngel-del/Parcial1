import { Injectable, NotFoundException} from '@nestjs/common';
import { CreateProveedoreDto } from './dto/create-proveedore.dto';
import { UpdateProveedoreDto } from './dto/update-proveedore.dto';
import { Repository } from 'typeorm';
import { Proveedore } from './entities/proveedore.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ProveedoresService {
  constructor(
    @InjectRepository(Proveedore)
    private proveedoresRepository: Repository<Proveedore>,
  ) {}


  async getAllProveedores(page: number, limit: number) {
    const [data, total] = await this.proveedoresRepository.findAndCount({
      where: { estado: 1 },
      skip: (page - 1) * limit,
      take: limit,
      relations: ['municipio'],
    });
    const totalPages = Math.ceil(total / limit);
    return {
      data,
      total,
      currentPage: page,
      totalPages,
    };
  }

  async getProveedor(idProveedor: number) {
    const proveedor = await this.proveedoresRepository.findOne({
      where: { idProveedor },
      relations: ['municipio'],
    });
    if (!proveedor) {
      throw new NotFoundException(`Proveedor con ID ${idProveedor} no encontrado`);
    }
    return proveedor;
  }

  async createProveedor(dto: CreateProveedoreDto) {
    const newProveedor = this.proveedoresRepository.create({
      ...dto,
      municipio: { idMunicipio: dto.idMunicipio },
    });
    return await this.proveedoresRepository.save(newProveedor);
  }

  async updateProveedor(idProveedor: number, dto: UpdateProveedoreDto) {
    const result = await this.proveedoresRepository.update({ idProveedor }, dto);
    if (result.affected === 0) {
      throw new NotFoundException(`Proveedor con ID ${idProveedor} no encontrado`);
    }
    return this.getProveedor(idProveedor);
  }

  async deleteProveedor(idProveedor: number) {
    const result = await this.proveedoresRepository.update(
      { idProveedor },
      { estado: 0 },
    );
    if (result.affected === 0) {
      throw new NotFoundException(`Proveedor con ID ${idProveedor} no encontrado`);
    }
    return { message: 'Proveedor eliminado correctamente' };
  }
}
