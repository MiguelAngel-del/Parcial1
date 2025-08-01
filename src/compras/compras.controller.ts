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
    description: 'Este endpoint sirve para crear una nueva compra',
  })
  @ApiBody({ type: CreateCompraDto })
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

  @Delete(':idCompra')
  @ApiOperation({
    summary: 'Eliminar una compra',
    description: 'Este endpoint elimina una compra',
  })
  @ApiParam({
    name: 'idCompra',
    type: Number,
    description: 'Id de la compra a eliminar',
    example: 1,
  })
  deleteCompra(@Param('idCompra', ParseIntPipe) idCompra: number) {
    return this.comprasService.deleteCompra(idCompra);
  }
}
