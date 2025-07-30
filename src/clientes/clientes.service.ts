import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Cliente } from './entities/cliente.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ClientesService {
  constructor(
    @InjectRepository(Cliente)
    private readonly clientesRepository: Repository<Cliente>,
  ) {}

  async getAllClientes(page: number, limit: number) {
    const queryBuilder = this.clientesRepository
      .createQueryBuilder('cliente')
      .where('cliente.estado = :estado', { estado: 1 }); // Solo clientes activos

    const total = await queryBuilder.getCount();
    const clientes = await queryBuilder
      .skip((page - 1) * limit)
      .take(limit)
      .getMany();

    const totalPages = Math.ceil(total / limit);

    return {
      data: clientes,
      total,
      currentPage: page,
      totalPages,
    };
  }

  async getCliente(idCliente: number) {
    const cliente = await this.clientesRepository.findOneBy({ idCliente });
    if (!cliente) {
      throw new NotFoundException(`Cliente con ID ${idCliente} no encontrado`);
    }
    return cliente;
  }

  async createCliente(dto: CreateClienteDto) {
    const newCliente = this.clientesRepository.create(dto);
    return await this.clientesRepository.save(newCliente);
  }

  async updateCliente(idCliente: number, dto: UpdateClienteDto) {
    const result = await this.clientesRepository.update({ idCliente }, dto);
    if (result.affected === 0) {
      throw new NotFoundException(`Cliente con ID ${idCliente} no encontrado`);
    }
    return this.getCliente(idCliente);
  }

  async deleteCliente(idCliente: number) {
    const result = await this.clientesRepository.update(
      { idCliente },
      { estado: 0 },
    );
    if (result.affected === 0) {
      throw new NotFoundException(`Cliente con ID ${idCliente} no encontrado`);
    }
    return { message: `Cliente con ID ${idCliente} eliminado correctamente` };
  }
}
