import { ApiProperty } from "@nestjs/swagger";
import { Proveedore } from "src/proveedores/entities/proveedore.entity";
import { Usuario } from "src/usuarios/entities/usuario.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'compras' })
export class Compra {
    @PrimaryGeneratedColumn()
    @ApiProperty()
    idCompra: number;

    @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
    @ApiProperty()
    fechaCompra: Date;

    @Column({ nullable: false, type: 'decimal', precision: 10, scale: 2 })
    @ApiProperty()
    totalCompra: number;

    @Column({ nullable: false, type: 'tinyint', default: 1 })
    @ApiProperty()
    estado: number;

    @Column( { type: 'tinyint', default: 1 } )
    @ApiProperty()
    estadoCompra: number;

    @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
    @ApiProperty()
    createdAt: Date;

    @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
    @ApiProperty()
    updatedAt: Date;

    @ManyToOne(() => Proveedore, (idProveedor) => idProveedor.compra)
    @ApiProperty({ type: () => Compra })
    idProveedor: Compra;

    @ManyToOne(() => Usuario, (idUsuario) => idUsuario.compras)
    @ApiProperty({ type: () => Compra })
    idUsuario: Compra;
}
