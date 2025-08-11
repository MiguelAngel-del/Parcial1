import { Column, Entity, PrimaryGeneratedColumn, OneToMany, ManyToOne, JoinColumn} from 'typeorm';
import { Departamento } from '../../departamentos/entities/departamento.entity';
import { Proveedor } from '../../proveedores/entities/proveedore.entity';
import { ApiProperty } from '@nestjs/swagger';
import { Cliente } from 'src/clientes/entities/cliente.entity';

@Entity({ name: 'municipios' })
export class Municipio {
    @PrimaryGeneratedColumn()
    @ApiProperty()
    idMunicipio: number;

    @Column("varchar", { length: 255 })
    @ApiProperty()
    nombreMunicipio: string;

    @Column("varchar", { length: 10 })
    @ApiProperty()
    codigoMunicipio: string;

    @Column({ type: 'tinyint', default: 1 })
    estado: number;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    @ApiProperty()
    createdAt: Date;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    @ApiProperty()
    updatedAt: Date;

    @ManyToOne(() => Departamento, departamento => departamento.municipios)
    @JoinColumn({ name: 'idDepartamento' })
    @ApiProperty({ type: () => Departamento })
    departamento: Departamento;

    @OneToMany(() => Proveedor, proveedor => proveedor.municipio)
    proveedores: Proveedor[];

    @OneToMany(() => Cliente, cliente => cliente.municipio)
    clientes: Cliente[];
}
