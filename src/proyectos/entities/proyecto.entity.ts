import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Empleado } from '../../empleados/entities/empleado.entity';

@Entity({ name: 'proyectos' })
export class Proyecto {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @Column({ length: 100 })
  @ApiProperty()
  nombre: string;

  @Column('text')
  @ApiProperty()
  descripcion: string;

  @Column({ type: 'date' })
  @ApiProperty()
  fechaInicio: string;

  @Column({ type: 'date' })
  @ApiProperty()
  fechaFin: string;

  @Column('float')
  @ApiProperty({ example: 75, description: 'Porcentaje de completado' })
  porcentajeCompletado: number;

  @Column({ default: true })
  @ApiProperty({ example: true, description: 'Estado del proyecto (true = activo, false = inactivo)' })
  estado: boolean;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  @ApiProperty({ example: '2025-08-22T12:00:00Z', description: 'Fecha de creación' })
  createdAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  @ApiProperty({ example: '2025-08-22T12:00:00Z', description: 'Fecha de actualización' })
  updatedAt: Date;

  @OneToMany(() => Empleado, (empleado) => empleado.proyecto)
  @ApiProperty({ type: () => [Empleado], description: 'Empleados asignados', required: false })
  empleados: Empleado[];
}
