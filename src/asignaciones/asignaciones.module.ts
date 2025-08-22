import { Module } from '@nestjs/common';
import { AsignacionesController } from './asignaciones.controller';
import { AsignacionesService } from './asignaciones.service';
import { EmpleadosModule } from '../empleados/empleados.module';
import { ProyectosModule } from '../proyectos/proyectos.module';

@Module({
  imports: [EmpleadosModule, ProyectosModule],
  controllers: [AsignacionesController],
  providers: [AsignacionesService],
})
export class AsignacionesModule {}
