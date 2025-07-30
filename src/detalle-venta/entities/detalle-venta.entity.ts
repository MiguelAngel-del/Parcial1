import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
// import { Producto } from '../../productos/entities/producto.entity';
import { Venta } from '../../ventas/entities/venta.entity';

@Entity({ name: 'detalle_ventas' })
export class DetalleVenta {
    @PrimaryGeneratedColumn()
    @ApiProperty()
    idDetalleVenta: number;

    @ManyToOne(() => Venta)
    @JoinColumn({ name: 'idVenta' })
    @ApiProperty({ type: () => Venta })
    venta: Venta;

    /* @ManyToOne(() => Producto)
    @JoinColumn({ name: 'idProducto' })
    @ApiProperty({ type: () => Producto })
    producto: Producto;*/

    @Column('int')
    @ApiProperty()
    cantidadVenta: number;

    @Column('decimal', { precision: 10, scale: 2 })
    @ApiProperty()
    precioUnitarioVenta: number;

    @Column('decimal', { precision: 5, scale: 2 })
    @ApiProperty()
    descuentoAplicado: number;

    @Column('decimal', { precision: 10, scale: 2 })
    @ApiProperty()
    subtotalVenta: number;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    @ApiProperty()
    createdAt: Date;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    @ApiProperty()
    updatedAt: Date;
}
