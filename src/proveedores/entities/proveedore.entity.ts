import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn} from 'typeorm';
import { Municipio } from '../../municipios/entities/municipio.entity';
import { Compra } from 'src/compras/entities/compra.entity';

@Entity({ name: 'proveedores'})
export class Proveedore {
    @PrimaryGeneratedColumn()
    @ApiProperty()
    idProveedor: number;

    @Column( "varchar", { length: 255})
    @ApiProperty()
    nombreProveedor: string;

    @Column("varchar", { length: 10})
    @ApiProperty()
    telefonoProveedor: string;

    @Column("varchar", { length: 255})
    @ApiProperty()
    direccionProveedor: string;

    @Column({ type: 'tinyint', default: 1 })
    estado: number;

    @ManyToOne(() => Municipio, municipio => municipio.proveedores)
    @JoinColumn({ name: 'municipioIdMunicipio' })
    @ApiProperty({ type: () => Municipio })
    municipio: Municipio;
    
    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    @ApiProperty()
    createdAt: Date;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    @ApiProperty()
    updatedAt: Date;

    @ManyToOne(() => Compra, compra => compra.idProveedor)
    @JoinColumn({ name: 'compraIdCompra' })
    @ApiProperty({ type: () => Compra })
    compra: Compra;
    
}
