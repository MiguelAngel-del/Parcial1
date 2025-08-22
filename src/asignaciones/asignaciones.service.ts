import { Injectable } from '@nestjs/common';
import { EmpleadosService } from '../empleados/empleados.service';
import { ProyectosService } from '../proyectos/proyectos.service';

@Injectable()
export class AsignacionesService {
  constructor(
    private readonly empleadosService: EmpleadosService,
    private readonly proyectosService: ProyectosService,
  ) {}

  async asignarEmpleadoAProyecto(empleadoId: number, proyectoId: number, forzarCambio?: boolean): Promise<string> {
    const empleado = await this.empleadosService.findOne(empleadoId);
    const proyecto = await this.proyectosService.findOne(proyectoId);
    if (!empleado || !proyecto) {
      return 'Empleado o proyecto no encontrado';
    }
    if (empleado.proyecto) {
      if (!forzarCambio) {
        return `El empleado ya está asignado al proyecto: ${empleado.proyecto.nombre}`;
      } else {
        const proyectoAnterior = empleado.proyecto.nombre;
        empleado.proyecto = proyecto;
        await this.empleadosService.update(empleadoId, empleado);
              return `El empleado abandonará el proyecto '${proyectoAnterior}' para pasarse al nuevo proyecto '${proyecto.nombre}'.`;
      }
    }
    empleado.proyecto = proyecto;
    await this.empleadosService.update(empleadoId, empleado);
    return 'Empleado asignado correctamente';
  }
}
