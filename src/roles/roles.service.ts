import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Repository } from 'typeorm';
import { Role } from './entities/role.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role)
    private rolesRepository: Repository<Role>,
  ) {}

  async getAllRoles(page: number, limit: number) {
    const queryBuilder = this.rolesRepository
      .createQueryBuilder('role')
      .where('role.estado = :estado', { estado: 1 }) // Se toman solo los roles activos (con estado 1)

    const total = await queryBuilder.getCount();
    const roles = await queryBuilder
      .skip((page - 1) * limit)
      .take(limit)
      .getMany();

    const totalPages = Math.ceil(total / limit);

    return {
      data: roles,
      total,
      currentPage: page,
      totalPages,
    };
  }

  async getRole(idRol: number) {
    const role = await this.rolesRepository.findOneBy({ idRol });
    if (!role) {
      throw new NotFoundException(`Rol con ID ${idRol} no encontrado`);
    }
    return role;
  }

  async createRole(dto: CreateRoleDto) {
    const newRole = this.rolesRepository.create(dto);
    return await this.rolesRepository.save(newRole);
  }

  async updateRole(idRol: number, dto: UpdateRoleDto) {
    const result = await this.rolesRepository.update({ idRol }, dto);
    if (result.affected === 0) {
      throw new NotFoundException(`Rol con ID ${idRol} no encontrado`);
    }
    return this.getRole(idRol);
  }

  async deleteRole(idRol: number) {           //En este caso, no se borra como tal. Se utiliza un borrado lógico (cambiando el esatdo a 0)
    const result = await this.rolesRepository.update(
      { idRol },
      { estado: 0 },
    );
    if (result.affected === 0) {
      throw new NotFoundException(`Rol con ID ${idRol} no encontrado`);
    }
    return { message: 'Rol eliminado' };
  }
}
