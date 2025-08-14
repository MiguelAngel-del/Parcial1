import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  DefaultValuePipe,
  Query,
  ParseIntPipe,
  UseGuards
} from '@nestjs/common';
import { ClientesService } from './clientes.service';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';
import { ClienteResponseDto } from './dto/cliente-response.dto';
import { ApiBearerAuth,ApiBody, ApiOperation, ApiParam, ApiQuery, ApiOkResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';


@Controller('clientes')
export class ClientesController {
  constructor(private readonly clientesService: ClientesService) {}

  @Get()
  @ApiOperation({
    summary: 'Obtener todos los clientes con paginación',
    description: 'Este endpoint sirve para obtener un cliente en específico',
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
  getAllClientes(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
  ): Promise<{
    data: any[];
    total: number;
    currentPage: number;
    totalPages: number;
  }> {
    return this.clientesService.getAllClientes(page, limit);
  }

  @Get(':idCliente')
  @ApiOperation({
    summary: 'Obtener un cliente por su id',
    description: 'Este endpoint sirve para obtener un cliente en específico',
  })
  @ApiParam({
    name: 'idCliente',
    type: Number,
    description: 'ID del cliente a obtener',
    example: 1,
  })
  @ApiOkResponse({ type: ClienteResponseDto })
  getCliente(@Param('idCliente', ParseIntPipe) idCliente: number): Promise<ClienteResponseDto> {
    return this.clientesService.getCliente(idCliente) as Promise<ClienteResponseDto>;
  }

  @Post()
    @ApiOperation({
      summary: 'Para crear un nuevo cliente',
      description: 'Este endpoint sirve para crear un nuevo cliente. Si se incluye el campo opcional de Usuario, se crea y vincula un usuario.',
    })
    @ApiBody({
      type: CreateClienteDto,
      examples: {
        soloCliente: {
          summary: 'Solo cliente',
          value: {
            nombreCliente: 'Ignacio Sanchez',
            telefonoCliente: '1234567890',
            correoCliente: 'ignacio@gmail.com',
            nitCliente: '12345678',
            idMunicipio: 1
          }
        },
        clienteConUsuario: {
          summary: 'Cliente con usuario',
          value: {
            nombreCliente: 'Ana López',
            telefonoCliente: '9876543210',
            correoCliente: 'ana@gmail.com',
            nitCliente: '87654321',
            idMunicipio: 2,
            usuarioOpcional: {
              nombreUsuario: 'analopez',
              correoUsuario: 'ana.lopez@correo.com',
              contrasenaHash: 'password123',
              idRol: 2
            }
          }
        }
      }
    })
    createCliente(@Body() newCliente: CreateClienteDto) {
      return this.clientesService.createCliente(newCliente);
    }

  @Patch(':idCliente')
  @ApiOperation({
    summary: 'Actualizar un cliente existente',
    description: 'Este endpoint sirve para poder actualizar un cliente',
  })
  @ApiParam({
    name: 'idCliente',
    type: Number,
    description: 'ID del cliente a actualizar',
    example: 1,
  })
  updateCliente(
    @Param('idCliente', ParseIntPipe) idCliente: number,
    @Body() updateClienteDto: UpdateClienteDto,
  ) {
    return this.clientesService.updateCliente(idCliente, updateClienteDto);
  }

  @Patch(':idCliente/delete')
  @ApiOperation({
    summary: 'Eliminar un cliente a elección',
    description:
      'Este endpoint permite eliminar un cliente cambiando su estado a inactivo',
  })
  @ApiParam({
    name: 'idCliente',
    type: Number,
    description: 'ID del cliente a eliminar',
    example: 1,
  })
  deleteCliente(@Param('idCliente', ParseIntPipe) idCliente: number) {
    return this.clientesService.deleteCliente(idCliente);
  }
}
