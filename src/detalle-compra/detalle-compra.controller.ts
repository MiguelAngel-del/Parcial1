import { UseGuards, Controller, Get, Post, Body, Patch, Param, Delete, Query, DefaultValuePipe, ParseIntPipe } from '@nestjs/common';
import { DetalleCompraService } from './detalle-compra.service';
import { CreateDetalleCompraSimpleDto } from './dto/create-detalle-compra.dto';
import { UpdateDetalleCompraDto } from './dto/update-detalle-compra.dto';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiQuery } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiBearerAuth('JWT-auth')
@UseGuards(JwtAuthGuard)
@Controller('detalle-compra')
export class DetalleCompraController {
  constructor(private readonly detalleCompraService: DetalleCompraService) {}

  @Get()
  @ApiOperation({
    summary: 'Listar todos los detalles de compra con paginación',
    description: 'Este endpoint sirve para obtener todos los detalles de compra registrados',
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
  findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
  ) {
    return this.detalleCompraService.findAll(page, limit);
  }

  @Get(':idDetalleCompra')
  @ApiOperation({
    summary: 'Obtener un detalle de compra específico',
    description: 'Este endpoint sirve para obtener un detalle de compra por su id',
  })
  @ApiParam({
    name: 'idDetalleCompra',
    type: Number,
    description: 'Id del detalle de compra a obtener',
    example: 1,
  })
  findOne(@Param('idDetalleCompra', ParseIntPipe) idDetalleCompra: number) {
    return this.detalleCompraService.findOne(idDetalleCompra);
  }

  @Post()
  @ApiOperation({
    summary: 'Crear un nuevo detalle de compra',
    description: 'Este endpoint sirve para crear un nuevo detalle de compra',
  })
  @ApiBody({ type: CreateDetalleCompraSimpleDto })
  create(@Body() createDetalleCompraDto: CreateDetalleCompraSimpleDto) {
    return this.detalleCompraService.create(createDetalleCompraDto);
  }

  @Patch(':idDetalleCompra')
  @ApiOperation({
    summary: 'Actualizar un detalle de compra existente',
    description: 'Este endpoint sirve para actualizar un detalle de compra',
  })
  @ApiParam({
    name: 'idDetalleCompra',
    type: Number,
    description: 'Id del detalle de compra a actualizar',
    example: 1,
  })
  update(
    @Param('idDetalleCompra', ParseIntPipe) idDetalleCompra: number,
    @Body() updateDetalleCompraDto: UpdateDetalleCompraDto,
  ) {
    return this.detalleCompraService.update(idDetalleCompra, updateDetalleCompraDto);
  }

  @Patch(':idDetalleCompra/delete')
  @ApiOperation({
    summary: 'Borrado lógico de un detalle de compra',
    description: 'Marca el detalle como inactivo y descuenta el stock correspondiente.',
  })
  @ApiParam({
    name: 'idDetalleCompra',
    type: Number,
    description: 'Id del detalle de compra a borrar lógicamente',
    example: 1,
  })
  deleteDetalleCompra(@Param('idDetalleCompra', ParseIntPipe) idDetalleCompra: number) {
    return this.detalleCompraService.deleteDetalleCompra(idDetalleCompra);
  }
}
