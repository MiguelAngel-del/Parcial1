import { UseGuards, Controller, ParseIntPipe, DefaultValuePipe, Query, Get, Post, Body, Patch, Param } from '@nestjs/common';
import { VentasService } from './ventas.service';
import { CreateVentaDto } from './dto/create-venta.dto';
import { UpdateVentaDto } from './dto/update-venta.dto';
import { ApiBearerAuth, ApiOperation, ApiQuery, ApiParam, ApiBody } from '@nestjs/swagger';
import { Venta } from './entities/venta.entity';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiBearerAuth('JWT-auth')
@UseGuards(JwtAuthGuard)
@Controller('ventas')
export class VentasController {
  constructor(private readonly ventasService: VentasService) {}

  @Get()
  @ApiOperation({
    summary: 'Obtener todas las ventas',
    description: 'Este endpoint lista todas las ventas con paginación'
  })
  @ApiQuery({
    name: 'page',
    required: false,
    type: Number,
    example: 1
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    type: Number,
    example: 1
  })
  getAllVentas(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
  ): Promise<{
    data: any[];
    total: number;
    currentPage: number;
    totalPages: number;
  }> {
    return this.ventasService.getAllVentas(page, limit);
  }

  @Get(':idVenta')
  @ApiOperation({
    summary: 'Obtener una venta por ID',
    description: 'Este endpoint sirve para obtener una venta específica por su ID'
  })
  @ApiParam({
    name: 'idVenta',
    type: Number,
    description: 'ID de la venta a obtener',
    example: 1
  })
  getVenta(@Param('idVenta') idVenta: number): Promise<Venta> {
    return this.ventasService.getVenta(idVenta);
  }

  @Post()
  @ApiOperation({
    summary: 'Crear una nueva venta',
    description: 'Este endpoint permite crear una nueva venta, descuenta del stock'
  })
  @ApiBody({ type: CreateVentaDto })
  createVenta(@Body() newVenta: CreateVentaDto): Promise<Venta> {
    return this.ventasService.createVenta(newVenta);
  }

  @Patch(':idVenta')
  @ApiOperation({
    summary: 'Actualizar una venta por ID',
    description: 'Este endpoint permite actualizar una venta existente por su ID'
  })
  @ApiParam({
    name: 'idVenta',
    type: Number,
    description: 'ID de la venta a actualizar',
    example: 1
  })
  updateVenta(
    @Param('idVenta') idVenta: number,
    @Body() updateVentaDto: UpdateVentaDto,
  ) {
    return this.ventasService.updateVenta(idVenta, updateVentaDto);
  }

  @Patch(':idVenta/delete')
  @ApiOperation({
    summary: 'Eliminar una venta por ID',
    description: 'Este endpoint permite eliminar una venta estableciendo su estado a inactivo'
  })
  @ApiParam({
    name: 'idVenta',
    type: Number
  })
  deleteVenta(@Param('idVenta') idVenta: number) {
    return this.ventasService.deleteVenta(idVenta);
  }
}
