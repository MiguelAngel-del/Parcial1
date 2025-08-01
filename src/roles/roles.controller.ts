import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ParseIntPipe,
  DefaultValuePipe,
  UseGuards,
} from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiQuery } from '@nestjs/swagger';
import { Role } from './entities/role.entity';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiBearerAuth('JWT-auth')
@UseGuards(JwtAuthGuard)
@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Get()
  @ApiOperation({
    summary: 'Obtener todos los roles con paginación',
    description:
      'Este endpoint lista los roles activos con soporte para paginación',
  })
  @ApiQuery({
    name: 'page',
    required: false,
    type: Number,
    example: 1,
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    type: Number,
    example: 1,
  })
  getAllRoles(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
  ): Promise<{
    data: any[];
    total: number;
    currentPage: number;
    totalPages: number;
  }> {
    return this.rolesService.getAllRoles(page, limit);
  }

  @Get(':idRol')
  @ApiOperation({
    summary: 'Obtener un rol por su id',
    description: 'Este endpoint sirve para obtener un rol en específico',
  })
  @ApiParam({
    name: 'idRol',
    type: Number,
    description: 'Id del rol a obtener',
    example: 1,
  })
  getRole(@Param('idRol', ParseIntPipe) idRol: number): Promise<Role> {
    return this.rolesService.getRole(idRol);
  }

  @Post()
  @ApiOperation({
    summary: 'Para crear un nuevo rol',
    description: 'Este endpoint sirve para crear nuevos roles',
  })
  @ApiBody({ type: CreateRoleDto })
  createRole(@Body() newRole: CreateRoleDto) {
    return this.rolesService.createRole(newRole);
  }

  @Patch(':idRol')
  @ApiOperation({
    summary: 'Actualizar un rol existente',
    description: 'Este endpoint nos sirve para poder actualizar un rol',
  })
  @ApiParam({ name: 'idRol', type: Number })
  updateRole(
    @Param('idRol', ParseIntPipe) idRol: number,
    @Body() updateRoleDto: UpdateRoleDto,
  ) {
    return this.rolesService.updateRole(idRol, updateRoleDto);
  }

  @Patch(':idRol/delete')
  @ApiOperation({
    summary: 'Eliminar un rol a elección',
    description: 'Este endpoint nos sirve para desactivar un rol',
  })
  @ApiParam({ name: 'idRol', type: Number })
  deleteRole(@Param('idRol', ParseIntPipe) idRol: number) {
    return this.rolesService.deleteRole(idRol);
  }
}
