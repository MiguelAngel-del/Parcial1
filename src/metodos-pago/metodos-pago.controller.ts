import { UseGuards, Controller, ParseIntPipe, DefaultValuePipe, Query, Get, Post, Body, Patch, Param } from '@nestjs/common';
import { MetodosPagoService } from './metodos-pago.service';
import { CreateMetodosPagoDto } from './dto/create-metodos-pago.dto';
import { UpdateMetodosPagoDto } from './dto/update-metodos-pago.dto';
import { ApiBearerAuth, ApiOperation, ApiQuery, ApiParam, ApiBody } from '@nestjs/swagger';
import { MetodoPago } from './entities/metodos-pago.entity';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiBearerAuth('JWT-auth')
@UseGuards(JwtAuthGuard)
@Controller('metodos-pago')
export class MetodosPagoController {
  constructor(private readonly metodosPagoService: MetodosPagoService) {}

  @Get()
  @ApiOperation({
    summary: 'Obtener todos los métodos de pago',
    description: 'Este endpoint lista todos los métodos de pago activos con paginación'
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
    example: 10
  })
  getAllMetodosPago(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
  ): Promise<{
    data: any[];
    total: number;
    currentPage: number;
    totalPages: number;
  }> {
    return this.metodosPagoService.getAllMetodosPago(page, limit);
  }

  @Get(':idMetodoPago')
  @ApiOperation({
    summary: 'Obtener un método de pago por ID',
    description: 'Este endpoint sirve para obtener un método de pago específico por su ID'
  })
  @ApiParam({
    name: 'idMetodoPago',
    type: Number,
    description: 'ID del método de pago a obtener',
    example: 1
  })
  getMetodoPago(@Param('idMetodoPago') idMetodoPago: number): Promise<MetodoPago> {
    return this.metodosPagoService.getMetodoPago(idMetodoPago);
  }

  @Post()
  @ApiOperation({
    summary: 'Crear un nuevo método de pago',
    description: 'Este endpoint permite crear un nuevo método de pago'
  })
  @ApiBody({ type: CreateMetodosPagoDto })
  createMetodoPago(@Body() newMetodoPago: CreateMetodosPagoDto): Promise<MetodoPago> {
    return this.metodosPagoService.createMetodoPago(newMetodoPago);
  }

  @Patch(':idMetodoPago')
  @ApiOperation({
    summary: 'Actualizar un método de pago por ID',
    description: 'Este endpoint permite actualizar un método de pago existente por su ID'
  })
  @ApiParam({
    name: 'idMetodoPago',
    type: Number,
    description: 'ID del método de pago a actualizar',
    example: 1
  })
  updateMetodoPago(
    @Param('idMetodoPago') idMetodoPago: number,
    @Body() updateMetodoPagoDto: UpdateMetodosPagoDto,
  ) {
    return this.metodosPagoService.updateMetodoPago(idMetodoPago, updateMetodoPagoDto);
  }

  @Patch(':idMetodoPago/delete')
  @ApiOperation({
    summary: 'Eliminar un método de pago por ID',
    description: 'Este endpoint permite eliminar un método de pago estableciendo su estado a inactivo'
  })
  @ApiParam({
    name: 'idMetodoPago',
    type: Number
  })
  deleteMetodoPago(@Param('idMetodoPago') idMetodoPago: number) {
    return this.metodosPagoService.deleteMetodoPago(idMetodoPago);
  }
}
