import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Usuario } from './entities/usuario.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsuariosService {
  constructor(
    @InjectRepository(Usuario)
    private readonly usuariosRepository: Repository<Usuario>,
  ) {}

  async getAllUsuarios(page: number, limit: number) {
    const queryBuilder = this.usuariosRepository
      .createQueryBuilder('usuario')
      .where('usuario.estado = :estado', { estado: true });

    const total = await queryBuilder.getCount();
    const usuarios = await queryBuilder
      .skip((page - 1) * limit)
      .take(limit)
      .getMany();

    return {
      data: usuarios,
      total,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
    };
  }

  async getUsuario(idUsuario: number) {
    const usuario = await this.usuariosRepository.findOneBy({ idUsuario });
    if (!usuario) {
      throw new NotFoundException(`Usuario con ID ${idUsuario} no encontrado`);
    }
    return usuario;
  }

  async createUsuario(dto: CreateUsuarioDto) {
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(dto.contrasenaHash, salt);

    const usuario = this.usuariosRepository.create({
      ...dto,
      contrasenaHash: hash,
      rol: { idRol: dto.idRol },
    });
    delete (usuario as any).idRol;

    return this.usuariosRepository.save(usuario);
  }

  async updateUsuario(idUsuario: number, dto: UpdateUsuarioDto) {
    if (dto.contrasenaHash) {
      const salt = await bcrypt.genSalt();
      dto.contrasenaHash = await bcrypt.hash(dto.contrasenaHash, salt);
    }

    const updateData: any = { ...dto };
    if (dto.idRol !== undefined) {
      updateData.rol = { idRol: dto.idRol };
      delete updateData.idRol;
    }

    await this.usuariosRepository.update({ idUsuario }, updateData);
    return this.getUsuario(idUsuario);
  }

  async deleteUsuario(idUsuario: number) {
    const result = await this.usuariosRepository.update(
      { idUsuario },
      { estado: false },
    );
    if (result.affected === 0) {
      throw new NotFoundException(`Usuario con ID ${idUsuario} no encontrado`);
    }
    return { message: `Usuario con ID ${idUsuario} eliminado correctamente` };
  }

  async findByEmail(correoUsuario: string): Promise<Usuario | undefined> {
    return this.usuariosRepository.findOne({ 
      where: { correoUsuario },
      relations: ['rol'],
    });
  }

  async findByUsername(nombreUsuario: string): Promise<Usuario | undefined> {
    return this.usuariosRepository.findOne({ 
      where: { nombreUsuario },
      relations: ['rol'],
    });
  }

  async findOne(idUsuario: number): Promise<Usuario | undefined> {
    return this.usuariosRepository.findOne({ 
      where: { idUsuario },
      relations: ['rol'],
    });
  }
}
