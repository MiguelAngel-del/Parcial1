import { Controller, ParseIntPipe, DefaultValuePipe, Query, Get, Post, Body, Patch, Param } from '@nestjs/common';
import { DetalleVentaService } from './detalle-venta.service';
import { CreateDetalleVentaDto } from './dto/create-detalle-venta.dto';
import { UpdateDetalleVentaDto } from './dto/update-detalle-venta.dto';
import { ApiOperation, ApiQuery, ApiParam, ApiBody } from '@nestjs/swagger';
import { DetalleVenta } from './entities/detalle-venta.entity';

@Controller('detalle-venta')
export class DetalleVentaController {
  constructor(private readonly detalleVentaService: DetalleVentaService) {}

  @Get()
  @ApiOperation({ summary: 'Obtener todos los detalles de venta', description: 'Lista todos los detalles de venta con paginación' })
  @ApiQuery({ name: 'page', required: false, type: Number, example: 1 })
  @ApiQuery({ name: 'limit', required: false, type: Number, example: 10 })
  getAllDetalleVenta(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
  ): Promise<{ data: any[]; total: number; currentPage: number; totalPages: number }> {
    return this.detalleVentaService.getAllDetalleVenta(page, limit);
  }

  @Get(':idDetalleVenta')
  @ApiOperation({ summary: 'Obtener detalle de venta por ID', description: 'Obtiene un detalle de venta específico por su ID' })
  @ApiParam({ name: 'idDetalleVenta', type: Number, description: 'ID del detalle de venta', example: 1 })
  getDetalleVenta(@Param('idDetalleVenta') idDetalleVenta: number): Promise<DetalleVenta> {
    return this.detalleVentaService.getDetalleVenta(idDetalleVenta);
  }

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo detalle de venta', description: 'Crea un nuevo detalle de venta' })
  @ApiBody({ type: CreateDetalleVentaDto })
  createDetalleVenta(@Body() newDetalleVenta: CreateDetalleVentaDto): Promise<DetalleVenta> {
    return this.detalleVentaService.createDetalleVenta(newDetalleVenta);
  }

  @Patch(':idDetalleVenta')
  @ApiOperation({ summary: 'Actualizar un detalle de venta por ID', description: 'Actualiza un detalle de venta existente por su ID' })
  @ApiParam({ name: 'idDetalleVenta', type: Number, description: 'ID del detalle de venta a actualizar', example: 1 })
  updateDetalleVenta(
    @Param('idDetalleVenta') idDetalleVenta: number,
    @Body() updateDetalleVentaDto: UpdateDetalleVentaDto,
  ) {
    return this.detalleVentaService.updateDetalleVenta(idDetalleVenta, updateDetalleVentaDto);
  }

  @Patch(':idDetalleVenta/delete')
  @ApiOperation({ summary: 'Eliminar un detalle de venta por ID', description: 'Elimina un detalle de venta estableciendo su estado a inactivo' })
  @ApiParam({ name: 'idDetalleVenta', type: Number })
  deleteDetalleVenta(@Param('idDetalleVenta') idDetalleVenta: number) {
    return this.detalleVentaService.deleteDetalleVenta(idDetalleVenta);
  }
}
