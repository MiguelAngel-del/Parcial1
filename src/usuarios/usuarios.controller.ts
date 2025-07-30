import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  DefaultValuePipe,
  ParseIntPipe,
} from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { ApiBody, ApiOperation, ApiParam, ApiQuery } from '@nestjs/swagger';

@Controller('usuarios')
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) {}

  @Get()
  @ApiOperation({
    summary: 'Obtener todos los usuarios con paginación',
    description:
      'Este endpoint sirve para obtener todos los usuarios registrados',
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
    example: 10,
  })
  getAllUsuarios(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
  ): Promise<{
    data: any[];
    total: number;
    currentPage: number;
    totalPages: number;
  }> {
    return this.usuariosService.getAllUsuarios(page, limit);
  }

  @Get(':idUsuario')
  @ApiOperation({
    summary: 'Obtener un usuario en específico',
    description: 'Este endpoint sirve para obtener un usuario por su id',
  })
  @ApiParam({
    name: 'idUsuario',
    type: Number,
    description: 'Id del usuario a obtener',
    example: 1,
  })
  getUsuario(@Param('idUsuario') idUsuario: number) {
    return this.usuariosService.getUsuario(idUsuario);
  }

  @Post()
  @ApiOperation({
    summary: 'Para crear un nuevo usuario',
    description: 'Este endpoint sirve para crear un nuevo usuario',
  })
  @ApiBody({ type: CreateUsuarioDto })
  createUsuario(@Body() createUsuarioDto: CreateUsuarioDto) {
    return this.usuariosService.createUsuario(createUsuarioDto);
  }

  @Patch(':idUsuario')
  @ApiOperation({
    summary: 'Actualizar un usuario existente',
    description: 'Este endpoint sirve para actualizar un usuario',
  })
  @ApiParam({
    name: 'idUsuario',
    type: Number,
    description: 'Id del usuario a actualizar',
    example: 1,
  })
  updateUsuario(
    @Param('idUsuario') idUsuario: number,
    @Body() updateUsuarioDto: UpdateUsuarioDto,
  ) {
    return this.usuariosService.updateUsuario(idUsuario, updateUsuarioDto);
  }

  @Patch(':idUsuario/delete')
  @ApiOperation({
    summary: 'Eliminar un usuario a elección',
    description: 'Este endpoint sirve para eliminar un usuario por su id',
  })
  @ApiParam({
    name: 'idUsuario',
    type: Number,
    description: 'Id del usuario a eliminar',
    example: 1,
  })
  deleteUsuario(@Param('idUsuario') idUsuario: number) {
    return this.usuariosService.deleteUsuario(idUsuario);
  }
}
