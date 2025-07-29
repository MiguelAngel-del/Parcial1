import { Controller, Get, Post, Patch, Param, Body, ParseIntPipe, Query, DefaultValuePipe } from '@nestjs/common';
import {ApiTags, ApiOperation, ApiParam, ApiBody, ApiQuery, ApiResponse } from '@nestjs/swagger';
import { CategoriasService } from './categorias.service';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { UpdateCategoriaDto } from './dto/update-categoria.dto';
import { Categoria } from './entities/categoria.entity';

@ApiTags('categorias')
@Controller('categorias')
export class CategoriasController {
  constructor(private readonly svc: CategoriasService) {}

  @Get()
  @ApiOperation({ summary: 'Obtener todas las categorías activas con paginación' })
  @ApiQuery({ name: 'page', required: false, type: Number, example: 1 })
  @ApiQuery({ name: 'limit', required: false, type: Number, example: 10 })
  @ApiResponse({ status: 200, description: 'Lista de categorías obtenida correctamente' })
  getAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
  ) {
    return this.svc.getAll(page, limit);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener una categoría por ID' })
  @ApiParam({ name: 'id', example: 1, description: 'ID de la categoría' })
  @ApiResponse({ status: 200, description: 'Categoría encontrada exitosamente' })
  @ApiResponse({ status: 404, description: 'Categoría no encontrada o está desactivada' })
  getOne(@Param('id', ParseIntPipe) id: number) {
    return this.svc.getOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Crear una nueva categoría' })
  @ApiBody({ type: CreateCategoriaDto })
  @ApiResponse({ status: 201, description: 'Categoría creada correctamente' })
  @ApiResponse({ status: 400, description: 'Datos inválidos para creación' })
  create(@Body() dto: CreateCategoriaDto) {
    return this.svc.create(dto);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar una categoría existente' })
  @ApiParam({ name: 'id', example: 1 })
  @ApiBody({ type: UpdateCategoriaDto })
  @ApiResponse({ status: 200, description: 'Categoría actualizada correctamente' })
  @ApiResponse({ status: 400, description: 'Datos inválidos para actualización' })
  @ApiResponse({ status: 404, description: 'Categoría no encontrada para actualizar' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateCategoriaDto,
  ) {
    return this.svc.update(id, dto);
  }

  @Patch(':id/delete')
  @ApiOperation({ summary: 'Desactivar una categoría (borrado lógico)' })
  @ApiParam({ name: 'id', example: 1 })
  @ApiResponse({ status: 200, description: 'Categoría desactivada correctamente' })
  @ApiResponse({ status: 404, description: 'Categoría no encontrada o ya desactivada' })
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.svc.delete(id);
  }
}
