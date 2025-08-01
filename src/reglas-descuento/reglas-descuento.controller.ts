import { UseGuards, Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ReglasDescuentoService } from './reglas-descuento.service';
import { CreateReglasDescuentoDto } from './dto/create-reglas-descuento.dto';
import { UpdateReglasDescuentoDto } from './dto/update-reglas-descuento.dto';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiQuery } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiBearerAuth('JWT-auth')
@UseGuards(JwtAuthGuard)
@Controller('reglas-descuento')
export class ReglasDescuentoController {
  constructor(private readonly reglasDescuentoService: ReglasDescuentoService) {}

  @Get()
  @ApiOperation({
    summary: 'Obtener todas las reglas de descuento con paginación',
    description: 'Este endpoint lista todas las reglas de descuento activas para paginación',
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
  getAllReglasDescuento(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ) {
    return this.reglasDescuentoService.getAllReglasDescuento(page, limit);
  }

  @Get(':idRegla')
  @ApiOperation({
    summary: 'Obtener una regla de descuento por su ID',
    description: 'Este endpoint sirve para obtener una regla de descuento específica',
  })
  @ApiParam({
    name: 'idRegla',
    type: Number,
    description: 'ID de la regla de descuento a obtener',
    example: 1,
  })
  getReglaDescuento(@Param('idRegla') idRegla: number) {
    return this.reglasDescuentoService.getReglaDescuento(idRegla);
  }

  @Post()
  @ApiOperation({
    summary: 'Crear una nueva regla de descuento',
    description: 'Este endpoint permite crear una nueva regla de descuento',
  })
  @ApiBody({
    type: CreateReglasDescuentoDto,
    description: 'Datos necesarios para crear una nueva regla de descuento',
  })
  createReglaDescuento(@Body() createReglasDescuentoDto: CreateReglasDescuentoDto) {
    return this.reglasDescuentoService.createReglaDescuento(createReglasDescuentoDto);
  }

  @Patch(':idRegla')
  @ApiOperation({
    summary: 'Actualizar una regla de descuento',
    description: 'Este endpoint permite actualizar una regla de descuento existente',
  })
  @ApiParam({ name: 'idRegla', type: Number, description: 'ID de la regla de descuento a actualizar', example: 1 })
  updateReglaDescuento(
    @Param('idRegla') idRegla: number,
    @Body() updateReglasDescuentoDto: UpdateReglasDescuentoDto,
  ) {
    return this.reglasDescuentoService.updateReglaDescuento(idRegla, updateReglasDescuentoDto);
  }

  @Patch(':idRegla/delete')
  @ApiOperation({
    summary: 'Eliminar una regla de descuento',
    description: 'Este endpoint permite eliminar una regla de descuento estableciendo su estado a inactivo',
  })
  @ApiParam({ name: 'idRegla', type: Number, description: 'ID de la regla de descuento a eliminar', example: 1 })
  deleteReglaDescuento(@Param('idRegla') idRegla: number) {
    return this.reglasDescuentoService.deleteReglaDescuento(idRegla);
  }
}
