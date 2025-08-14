import { UseGuards, Controller, Get, Post, Body, Patch, Param, Delete, Query, DefaultValuePipe, ParseIntPipe } from '@nestjs/common';
import { ComprasService } from './compras.service';
import { CreateCompraDto } from './dto/create-compra.dto';
import { UpdateCompraDto } from './dto/update-compra.dto';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiQuery } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiBearerAuth('JWT-auth')
@UseGuards(JwtAuthGuard)
@Controller('compras')
export class ComprasController {
  constructor(private readonly comprasService: ComprasService) {}
  
  @Get('reporte')
  @ApiOperation({
    summary: 'Obtener reporte de compras por rango de fechas',
    description: 'Este endpoint sirve para obtener un reporte de las compras realizadas en un rango de fechas',
  })
  @ApiQuery({ name: 'fechaInicio', type: String, required: true })
  @ApiQuery({ name: 'fechaFin', type: String, required: true })
  getReporteCompras(
    @Query('fechaInicio') fechaInicio: string,
    @Query('fechaFin') fechaFin: string,
  ) {
    return this.comprasService.getComprasPorFechas(new Date(fechaInicio), new Date(fechaFin));
  }

  @Get()
  @ApiOperation({
    summary: 'Para listar todas las compras con paginación',
    description: 'Este endpoint sirve para obtener todas las compras registradas',
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
  getAllCompras(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
  ) {
    return this.comprasService.getAllCompras(page, limit);
  }

  @Get(':idCompra')
  @ApiOperation({
    summary: 'Obtener una compra en específico',
    description: 'Este endpoint sirve para obtener una compra por su id',
  })
  @ApiParam({
    name: 'idCompra',
    type: Number,
    description: 'Id de la compra a obtener',
    example: 1,
  })
  getCompra(@Param('idCompra', ParseIntPipe) idCompra: number) {
    return this.comprasService.getCompra(idCompra);
  }

  @Post()
  @ApiOperation({
    summary: 'Crear una nueva compra',
    description: 'Este endpoint sirve para crear una nueva compra con sus detalles, cada uno con número de lote y fecha de vencimiento',
  })
  @ApiBody({
    type: CreateCompraDto,
    examples: {
      ejemplo: {
        value: {
          totalCompra: 1500.5,
          idProveedor: 2,
          idUsuario: 5,
          detalles: [
            { idProducto: 1, cantidad: 10, precioUnitario: 100.5, numeroLote: 'L-2025-001', fechaVencimiento: '2025-12-31' },
            { idProducto: 2, cantidad: 5, precioUnitario: 50, numeroLote: 'L-2025-002', fechaVencimiento: '2026-01-31' }
          ]
        }
      }
    }
  })
  createCompra(@Body() newCompra: CreateCompraDto) {
    return this.comprasService.createCompra(newCompra);
  }

  @Patch(':idCompra')
  @ApiOperation({
    summary: 'Actualizar una compra existente',
    description: 'Este endpoint sirve para actualizar una compra',
  })
  @ApiParam({
    name: 'idCompra',
    type: Number,
    description: 'Id de la compra a actualizar',
    example: 1,
  })
  updateCompra(
    @Param('idCompra', ParseIntPipe) idCompra: number,
    @Body() updateCompraDto: UpdateCompraDto,
  ) {
    return this.comprasService.updateCompra(idCompra, updateCompraDto);
  }

  @Patch(':idCompra/delete')
  @ApiOperation({
    summary: 'Borrado lógico de una compra',
    description: 'Este endpoint realiza un borrado lógico de la compra (no elimina físicamente)',
  })
  @ApiParam({
    name: 'idCompra',
    type: Number,
    description: 'Id de la compra a borrar lógicamente',
    example: 1,
  })
  deleteCompra(@Param('idCompra', ParseIntPipe) idCompra: number) {
    return this.comprasService.deleteCompra(idCompra);
  }

}
