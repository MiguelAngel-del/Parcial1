import { Controller, Get, Post, Patch, Param, Body, ParseIntPipe, Query, DefaultValuePipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiParam, ApiBody, ApiQuery, ApiResponse } from '@nestjs/swagger';
import { StockService } from './stock.service';
import { CreateStockDto } from './dto/create-stock.dto';
import { UpdateStockDto } from './dto/update-stock.dto';

@ApiTags('stock')
@Controller('stock')
export class StockController {
  constructor(private readonly svc: StockService) {}

  @Get()
  @ApiOperation({ summary: 'Obtener todos los registros de stock activos con paginación' })
  @ApiQuery({ name: 'page', required: false, type: Number, example: 1 })
  @ApiQuery({ name: 'limit', required: false, type: Number, example: 10 })
  @ApiResponse({ status: 200, description: 'Lista de stock obtenida correctamente' })
  getAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
  ) {
    return this.svc.getAll(page, limit);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un registro de stock por ID' })
  @ApiParam({ name: 'id', example: 1, description: 'ID del registro de stock' })
  @ApiResponse({ status: 200, description: 'Stock encontrado exitosamente' })
  @ApiResponse({ status: 404, description: 'Registro no encontrado' })
  getOne(@Param('id', ParseIntPipe) id: number) {
    return this.svc.getOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo registro de stock' })
  @ApiBody({ type: CreateStockDto })
  @ApiResponse({ status: 201, description: 'Stock creado exitosamente' })
  @ApiResponse({ status: 400, description: 'Datos inválidos para creación' })
  create(@Body() dto: CreateStockDto) {
    return this.svc.create(dto);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar un registro de stock existente' })
  @ApiParam({ name: 'id', example: 1 })
  @ApiBody({ type: UpdateStockDto })
  @ApiResponse({ status: 200, description: 'Stock actualizado exitosamente' })
  @ApiResponse({ status: 400, description: 'Datos inválidos para actualización' })
  @ApiResponse({ status: 404, description: 'Registro no encontrado para actualizar' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateStockDto,
  ) {
    return this.svc.update(id, dto);
  }

  @Patch(':id/delete')
  @ApiOperation({ summary: 'Desactivar un registro de stock (borrado lógico)' })
  @ApiParam({ name: 'id', example: 1 })
  @ApiResponse({ status: 200, description: 'Stock desactivado correctamente' })
  @ApiResponse({ status: 404, description: 'Registro no encontrado o ya desactivado' })
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.svc.delete(id);
  }
}
