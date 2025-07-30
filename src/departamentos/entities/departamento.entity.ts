import { ApiProperty } from "@nestjs/swagger";
import {Column, Entity, PrimaryGeneratedColumn, OneToMany} from 'typeorm';
import { Municipio } from '../../municipios/entities/municipio.entity';

@Entity({ name: 'departamentos' })
export class Departamento {
    @PrimaryGeneratedColumn()
    @ApiProperty()
    idDepartamento: number;

    @Column("varchar", { length: 255 })
    @ApiProperty()
    nombreDepartamento: string;

    @Column("varchar", { length: 10 })
    @ApiProperty()
    codigoDepartamento: string;

    @Column({ type: 'tinyint', default: 1 })
    estado: number;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    @ApiProperty()
    createdAt: Date;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    @ApiProperty()
    updatedAt: Date;

    @OneToMany(() => Municipio, municipio => municipio.departamento)
    @ApiProperty({ type: () => [Municipio] })
    municipios: Municipio[];
}
