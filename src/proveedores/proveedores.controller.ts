import { UseGuards, Controller, ParseIntPipe ,DefaultValuePipe, Query, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProveedoresService } from './proveedores.service';
import { CreateProveedoreDto } from './dto/create-proveedore.dto';
import { UpdateProveedoreDto } from './dto/update-proveedore.dto';
import { ApiBearerAuth,ApiOperation, ApiQuery, ApiParam, ApiBody } from '@nestjs/swagger';
import { Proveedor } from './entities/proveedore.entity';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiBearerAuth('JWT-auth')
@UseGuards(JwtAuthGuard)
@Controller('proveedores')
export class ProveedoresController {
  constructor(private readonly proveedoresService: ProveedoresService) {}

  @Get()
  @ApiOperation({ 
    summary: 'Obtener todos los proveedores',
    description: 'Este endpoint lista todos los proveedores activos con paginación'
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

  getAllProveedores(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
  ): Promise<{
    data: any[];
    total: number;
    currentPage: number;
    totalPages: number;
  }> {
    return this.proveedoresService.getAllProveedores(page, limit);
  }

  @Get(':idProveedor')
  @ApiOperation({ 
    summary: 'Obtener un proveedor por ID',
    description: 'Este endpoint sirve para obtener un proveedor específico por su ID'
  })
  @ApiParam({
    name: 'idProveedor',
    type: Number,
    description: 'ID del proveedor a obtener',
    example: 1
  })
  getProveedorById(@Param('idProveedor') idProveedor: number): Promise<Proveedor> {
    return this.proveedoresService.getProveedorById(idProveedor);
  }

  @Post()
  @ApiOperation({ 
    summary: 'Crear un nuevo proveedor',
    description: 'Este endpoint permite crear un nuevo proveedor'
  })
  @ApiBody({ type: CreateProveedoreDto })
  createProveedor(@Body() newProveedor: CreateProveedoreDto): Promise<Proveedor> {
    return this.proveedoresService.createProveedor(newProveedor);
  }

  @Patch(':idProveedor')
  @ApiOperation({ 
    summary: 'Actualizar un proveedor por ID',
    description: 'Este endpoint permite actualizar un proveedor existente por su ID'
  })
  @ApiParam({
    name: 'idProveedor',
    type: Number,
    description: 'ID del proveedor a actualizar',
    example: 1
  })
  updateProveedor(
    @Param('idProveedor') idProveedor: number,
    @Body() updateProveedoreDto: UpdateProveedoreDto,
  ) {
    return this.proveedoresService.updateProveedor(idProveedor, updateProveedoreDto);
  }

  @Patch(':idProveedor/delete')
  @ApiOperation({ 
    summary: 'Eliminar un proveedor por ID',
    description: 'Este endpoint permite eliminar un proveedor estableciendo su estado a inactivo'
  })
  @ApiParam({
    name: 'idProveedor',
    type: Number
  })
  deleteProveedor(@Param('idProveedor') idProveedor: number) {
    return this.proveedoresService.deleteProveedor(idProveedor);
  }
  
}
