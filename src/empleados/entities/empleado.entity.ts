import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Proyecto } from '../../proyectos/entities/proyecto.entity';

@Entity({ name: 'empleados' })
export class Empleado {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @Column({ length: 100 })
  @ApiProperty()
  nombre: string;

  @Column({ length: 100 })
  @ApiProperty()
  apellido: string;

  @Column({ length: 100, unique: true })
  @ApiProperty()
  email: string;

  @Column({ length: 20 })
  @ApiProperty()
  telefono: string;

  @Column({ length: 200 })
  @ApiProperty()
  direccion: string;

  @Column({ type: 'date' })
  @ApiProperty()
  fechaNacimiento: string;

  @Column({ length: 100 })
  @ApiProperty()
  puesto: string;

  @Column('decimal', { precision: 10, scale: 2 })
  @ApiProperty()
  salario: number;

  @Column({ type: 'date' })
  @ApiProperty()
  fechaIngreso: string;

  @Column({ default: true })
  @ApiProperty({ example: true, description: 'Estado del empleado (true = activo, false = inactivo)' })
  estado: boolean;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  @ApiProperty({ example: '2025-08-22T12:00:00Z', description: 'Fecha de creación' })
  createdAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  @ApiProperty({ example: '2025-08-22T12:00:00Z', description: 'Fecha de actualización' })
  updatedAt: Date;

  @ManyToOne(() => Proyecto, (proyecto) => proyecto.empleados, { nullable: true })
  @JoinColumn({ name: 'proyectoId' })
  @ApiProperty({ type: () => Proyecto, nullable: true })
  proyecto?: Proyecto;
}
