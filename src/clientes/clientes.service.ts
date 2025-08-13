import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Cliente } from './entities/cliente.entity';
import { Repository } from 'typeorm';
import { UsuariosService } from 'src/usuarios/usuarios.service';
import { Usuario } from 'src/usuarios/entities/usuario.entity';

@Injectable()
export class ClientesService {
  constructor(
    @InjectRepository(Cliente)
    private readonly clientesRepository: Repository<Cliente>,
    private readonly usuariosService: UsuariosService,
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
    const createData: any = { ...dto };
    if (dto.idMunicipio !== undefined) {
      createData.municipio = { idMunicipio: dto.idMunicipio };
      delete createData.idMunicipio;
    }

    // Si se reciben datos de usuario, se crea y se vincula
    if (dto.usuarioOpcional) {
      // Se crea el  usuario y se obtiene el id
      const usuarioCreado: Usuario = await this.usuariosService.createUsuario(
        dto.usuarioOpcional,
      );
      createData.usuario = usuarioCreado;
    }
    delete createData.usuarioOpcional;

    const newCliente = this.clientesRepository.create(createData);
    return await this.clientesRepository.save(newCliente);
  }

  async updateCliente(idCliente: number, dto: UpdateClienteDto) {
    const updateData: any = { ...dto };

    if (dto.idMunicipio !== undefined) {
      updateData.municipio = { idMunicipio: dto.idMunicipio };
      delete updateData.idMunicipio;
    }

    const result = await this.clientesRepository.update(
      { idCliente },
      updateData,
    );
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
