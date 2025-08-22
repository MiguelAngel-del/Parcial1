import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBody, ApiResponse } from '@nestjs/swagger';
import { AsignacionesService } from './asignaciones.service';

@ApiTags('asignaciones')
@Controller('asignaciones')
export class AsignacionesController {
  constructor(private readonly asignacionesService: AsignacionesService) {}

  @Post()
  @ApiOperation({ summary: 'Asignar o cambiar un empleado de proyecto' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        empleadoId: { type: 'number', example: 1 },
        proyectoId: { type: 'number', example: 1 },
        forzarCambio: { type: 'boolean', example: false },
      },
      required: ['empleadoId', 'proyectoId'],
      example: { empleadoId: 1, proyectoId: 1, forzarCambio: false },
    },
    description: 'IDs del empleado y proyecto a asignar. Si forzarCambio es true, el empleado cambiará de proyecto. Si se le asigna un nuevo proyecto abandora el anterior',
  })
  @ApiResponse({ status: 200, description: 'Empleado asignado o cambiado de proyecto correctamente' })
  @ApiResponse({ status: 400, description: 'Empleado o proyecto no encontrado, o empleado ya asignado' })
  async asignar(@Body() body: { empleadoId: number; proyectoId: number; forzarCambio?: boolean }) {
    return this.asignacionesService.asignarEmpleadoAProyecto(body.empleadoId, body.proyectoId, body.forzarCambio);
  }
}
