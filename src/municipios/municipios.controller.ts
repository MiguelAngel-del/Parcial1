import { Controller, Get, Query, Param, DefaultValuePipe, ParseIntPipe,  } from '@nestjs/common';
import { MunicipiosService } from './municipios.service';
import { CreateMunicipioDto } from './dto/create-municipio.dto';
import { UpdateMunicipioDto } from './dto/update-municipio.dto';
import { ApiOperation, ApiParam, ApiQuery } from '@nestjs/swagger';
import { Municipio } from './entities/municipio.entity';

@Controller('municipios')
export class MunicipiosController {
  constructor(private readonly municipiosService: MunicipiosService) {}

 @Get()
 @ApiOperation({
    summary: 'Obtener todos los municipios',
    description: 'Este endpoint lista todos los municipios activos'
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

  getAllMunicipios(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
  ): Promise<{
    data: any[];
    total: number;
    currentPage: number;
    totalPages: number;
  }> {
    return this.municipiosService.getAllMunicipios(page, limit);
  }

  @Get(':idMunicipio')
  @ApiOperation({
    summary: 'Obtener un municipio por ID',
    description: 'Este endpoint sirve para obtener un municipio específico por su ID'
  })
  @ApiParam({
    name: 'idMunicipio',
    type: Number,
    description: 'ID del municipio a obtener',
    example: 1
  })
  getMunicipio(@Param('idMunicipio') idMunicipio: number): Promise<any> {
    return this.municipiosService.getMunicipio(idMunicipio);
  }
}
