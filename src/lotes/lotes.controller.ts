import { UseGuards, Controller, Get, Post, Patch, Param, Body, ParseIntPipe, Query, DefaultValuePipe } from '@nestjs/common';
import { ApiBearerAuth, ApiTags, ApiOperation, ApiParam, ApiBody, ApiQuery, ApiResponse } from '@nestjs/swagger';
import { LotesService } from './lotes.service';
import { CreateLoteDto } from './dto/create-lote.dto';
import { UpdateLoteDto } from './dto/update-lote.dto';
import { Lote } from './entities/lote.entity';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('lotes')
@ApiBearerAuth('JWT-auth')
@UseGuards(JwtAuthGuard)
@Controller('lotes')
export class LotesController {
  constructor(private readonly svc: LotesService) {}
  
  @Get('reporte')
  @ApiOperation({ summary: 'Obtener reporte de lotes por rango de fechas' })
  @ApiQuery({ name: 'fechaInicio', type: String, required: true })
  @ApiQuery({ name: 'fechaFin', type: String, required: true })
  getReporteLotes(
    @Query('fechaInicio') fechaInicio: string,
    @Query('fechaFin') fechaFin: string,
  ) {
    return this.svc.getLotesPorFechas(new Date(fechaInicio), new Date(fechaFin));
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todos los lotes activos con paginación' })
  @ApiQuery({ name: 'page', required: false, type: Number, example: 1 })
  @ApiQuery({ name: 'limit', required: false, type: Number, example: 10 })
  @ApiResponse({ status: 200, description: 'Lista de lotes obtenida correctamente' })
  getAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
  ) {
    return this.svc.getAll(page, limit);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un lote por ID' })
  @ApiParam({ name: 'id', example: 1, description: 'ID del lote' })
  @ApiResponse({ status: 200, description: 'Lote encontrado exitosamente' })
  @ApiResponse({ status: 404, description: 'Lote no encontrado o está desactivado' })
  getOne(@Param('id', ParseIntPipe) id: number) {
    return this.svc.getOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo lote' })
  @ApiBody({ type: CreateLoteDto })
  @ApiResponse({ status: 201, description: 'Lote creado correctamente' })
  @ApiResponse({ status: 400, description: 'Datos inválidos para creación' })
  create(@Body() dto: CreateLoteDto) {
    return this.svc.create(dto);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar un lote existente' })
  @ApiParam({ name: 'id', example: 1 })
  @ApiBody({ type: UpdateLoteDto })
  @ApiResponse({ status: 200, description: 'Lote actualizado exitosamente' })
  @ApiResponse({ status: 400, description: 'Datos inválidos para actualización' })
  @ApiResponse({ status: 404, description: 'Lote no encontrado para actualizar' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateLoteDto,
  ) {
    return this.svc.update(id, dto);
  }

  @Patch(':id/delete')
  @ApiOperation({ summary: 'Desactivar un lote (borrado lógico)' })
  @ApiParam({ name: 'id', example: 1 })
  @ApiResponse({ status: 200, description: 'Lote desactivado correctamente' })
  @ApiResponse({ status: 400, description: 'El lote tiene stock activo y no puede desactivarse' })
  @ApiResponse({ status: 404, description: 'Lote no encontrado o ya desactivado' })
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.svc.delete(id);
  }

}
