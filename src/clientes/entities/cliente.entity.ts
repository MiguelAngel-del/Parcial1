import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Municipio } from 'src/municipios/entities/municipio.entity';
import { Venta } from 'src/ventas/entities/venta.entity';
import { Usuario } from 'src/usuarios/entities/usuario.entity';

@Entity({ name: 'clientes' })
export class Cliente {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  idCliente: number;

  @Column({ nullable: false })
  @ApiProperty()
  nombreCliente: string;

  @Column({ nullable: true, type: 'varchar', length: 10 })
  @ApiProperty()
  telefonoCliente: string;

  @Column({ nullable: true, type: 'varchar', length: 150 })
  @ApiProperty()
  correoCliente: string;

  @Column({ nullable: true, type: 'varchar', length: 10 })
  @ApiProperty()
  nitCliente: string;

  @Column({ type: 'tinyint', default: 1, nullable: true })
  @ApiProperty()
  estado: number;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  @ApiProperty()
  createdAt: Date;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  @ApiProperty()
  updatedAt: Date;

  @OneToMany(() => Venta, (venta) => venta.cliente)
  @ApiProperty({ type: () => Venta })
  ventas: Venta[];

  @ManyToOne(() => Municipio, (municipio) => municipio.clientes)
  @ApiProperty({ type: () => Municipio })
  municipio: Municipio;

  @ManyToOne(() => Usuario, { nullable: true })
  @ApiProperty({
    type: () => Usuario,
    required: false,
    description: 'Usuario vinculado si el cliente decide crear cuenta',
  })
  usuario: Usuario;
}
