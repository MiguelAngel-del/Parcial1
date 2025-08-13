import { Controller, Get, Param, Query, ParseIntPipe, DefaultValuePipe } from '@nestjs/common';
import { DepartamentosService } from './departamentos.service';
import { CreateDepartamentoDto } from './dto/create-departamento.dto';
import { UpdateDepartamentoDto } from './dto/update-departamento.dto';
import { ApiBearerAuth, ApiOperation, ApiQuery, ApiParam, ApiBody } from '@nestjs/swagger';
import { Departamento } from './entities/departamento.entity';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('departamentos')
export class DepartamentosController {
  constructor(private readonly departamentosService: DepartamentosService) {}

  @Get()
  @ApiOperation({
    summary: 'Obtener todos los departamentos',
    description: 'Este endpoint lista todos los departamentos activos con paginación'
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

  getAllDepartamentos(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
  ): Promise<{
    data: any[];
    total: number;
    currentPage: number;
    totalPages: number;
  }> {
    return this.departamentosService.getAllDepartamentos(page, limit);
  }

  @Get(':idDepartamento')
  @ApiOperation({
    summary: 'Obtener un departamento por ID',
    description: 'Este endpoint sirve para obtener un departamento específico por su ID'
  })
  @ApiParam({
    name: 'idDepartamento',
    type: Number,
    description: 'ID del departamento a obtener',
    example: 1
  })
  getDepartamento(@Param('idDepartamento') idDepartamento: number): Promise<Departamento> {
    return this.departamentosService.getDepartamento(idDepartamento);
  }

}
