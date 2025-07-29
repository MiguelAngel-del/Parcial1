import { Controller, Get, Post, Patch, Param, Body, ParseIntPipe, Query, DefaultValuePipe } from '@nestjs/common';
import {ApiTags, ApiOperation, ApiParam, ApiBody, ApiQuery, ApiResponse } from '@nestjs/swagger';
import { ProductosService } from './productos.service';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';
import { Producto } from './entities/producto.entity';

@ApiTags('productos')
@Controller('productos')
export class ProductosController {
  constructor(private readonly svc: ProductosService) {}

  @Get()
  @ApiOperation({ summary: 'Obtener todos los productos activos con paginación' })
  @ApiQuery({ name: 'page', required: false, type: Number, example: 1 })
  @ApiQuery({ name: 'limit', required: false, type: Number, example: 10 })
  @ApiResponse({ status: 200, description: 'Listado de productos obtenido correctamente' })
  getAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
  ) {
    return this.svc.getAll(page, limit);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un producto por ID' })
  @ApiParam({ name: 'id', example: 1, description: 'ID del producto' })
  @ApiResponse({ status: 200, description: 'Producto encontrado exitosamente' })
  @ApiResponse({ status: 404, description: 'Producto no encontrado o desactivado' })
  getOne(@Param('id', ParseIntPipe) id: number) {
    return this.svc.getOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo producto' })
  @ApiBody({ type: CreateProductoDto })
  @ApiResponse({ status: 201, description: 'Producto creado exitosamente' })
  @ApiResponse({ status: 400, description: 'Datos inválidos para creación' })
  create(@Body() dto: CreateProductoDto) {
    return this.svc.create(dto);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar un producto existente' })
  @ApiParam({ name: 'id', example: 1 })
  @ApiBody({ type: UpdateProductoDto })
  @ApiResponse({ status: 200, description: 'Producto actualizado exitosamente' })
  @ApiResponse({ status: 400, description: 'Datos inválidos para actualización' })
  @ApiResponse({ status: 404, description: 'Producto no encontrado para actualizar' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateProductoDto,
  ) {
    return this.svc.update(id, dto);
  }

  @Patch(':id/delete')
  @ApiOperation({ summary: 'Desactivar un producto (borrado lógico)' })
  @ApiParam({ name: 'id', example: 1 })
  @ApiResponse({ status: 200, description: 'Producto desactivado correctamente' })
  @ApiResponse({ status: 404, description: 'Producto no encontrado o ya desactivado' })
  desactivar(@Param('id', ParseIntPipe) id: number) {
    return this.svc.delete(id);
  }
}
