import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Compra } from 'src/compras/entities/compra.entity';
import { Producto } from 'src/productos/entities/producto.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'detallecompras' })
export class DetalleCompra {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  idDetalleCompra: number;

  @ManyToOne(() => Compra, compra => compra.detalles)
  @JoinColumn({ name: 'idCompra' })
  @ApiProperty({ type: () => Compra })
  compra: Compra;

  @ManyToOne(() => Producto, producto => producto.detallesCompra)
  @JoinColumn({ name: 'idProducto' })
  @ApiProperty({ type: () => Producto })
  producto: Producto;

  @Column({ type: 'int' })
  @ApiProperty()
  cantidadCompra: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  @ApiProperty()
  precioUnitarioCompra: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  @ApiProperty()
  subtotalCompra: number;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  @ApiProperty()
  createdAt: Date;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  @ApiProperty()
  updatedAt: Date;
}
