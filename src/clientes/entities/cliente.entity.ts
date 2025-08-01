import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

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

  /*
  @ManyToOne(() => Municipios, (municipios) => municipios.clientes)
  idMunicipio: Municipios;
  */
  @ManyToOne(() => Cliente, cliente => cliente.ventas)
  @ApiProperty({ type: () => Cliente })
  ventas: Cliente[];
}
