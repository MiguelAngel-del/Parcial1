import { ApiProperty } from '@nestjs/swagger';
import { Compra } from 'src/compras/entities/compra.entity';
import { Role } from 'src/roles/entities/role.entity';
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'usuarios' })
export class Usuario {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  idUsuario: number;

  @Column({ unique: true, nullable: false })
  @ApiProperty()
  nombreUsuario: string;

  @Column({ unique: true, nullable: false })
  @ApiProperty()
  correoUsuario: string;

  @Column({ nullable: false })
  @ApiProperty()
  contrasenaHash: string;

  @ManyToOne(() => Role, (rol) => rol.usuarios)
  rol: Role;

  @OneToMany(() => Compra, (compra) => compra.idUsuario)
  compras: Compra[];



  @Column({ default: true })
  @ApiProperty({ default: true })
  estado: boolean;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  @ApiProperty()
  createdAt: Date;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  @ApiProperty()
  updatedAt: Date;
}
