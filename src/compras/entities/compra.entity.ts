import { ApiProperty } from "@nestjs/swagger";
import { Proveedor } from "src/proveedores/entities/proveedore.entity";
import { Usuario } from "src/usuarios/entities/usuario.entity";
import { Column, JoinColumn,Entity, ManyToOne, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { DetalleCompra } from './detalle-compra.entity';

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

    @ManyToOne(() => Proveedor, proveedor => proveedor.compras)
    @JoinColumn({ name: 'idProveedor' })
    @ApiProperty({ type: () => Proveedor })
    proveedor: Proveedor;

    @ManyToOne(() => Usuario, (usuario) => usuario.compras)
    @JoinColumn({ name: 'idUsuario' })
    @ApiProperty({ type: () => Usuario })
    usuario: Usuario;

    @OneToMany(() => DetalleCompra, detalle => detalle.compra, { cascade: true })
    detalles: DetalleCompra[];
}
