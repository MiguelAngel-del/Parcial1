import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Compra } from './compra.entity';
import { Producto } from 'src/productos/entities/producto.entity';
import { ApiProperty } from '@nestjs/swagger';
import { Lote } from 'src/lotes/entities/lote.entity';

@Entity({ name: 'detalle_compras' })
export class DetalleCompra {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  idDetalleCompra: number;

  @ManyToOne(() => Compra, compra => compra.detalles, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'idCompra' })
  @ApiProperty({ type: () => Compra })
  compra: Compra;

  @ManyToOne(() => Producto, producto => producto.detallesCompra)
  @JoinColumn({ name: 'idProducto' })
  @ApiProperty({ type: () => Producto })
  producto: Producto;

  @ManyToOne(() => Lote, { eager: true })
  @JoinColumn({ name: 'idLote' })
  @ApiProperty({
    type: () => Lote,
    required: false,
    description: 'Lote asociado al detalle de compra. Incluye numeroLote y fechaVencimiento.',
    example: {
      idLote: 1,
      numeroLote: 'L-2025-001',
      fechaVencimiento: '2025-12-31T00:00:00.000Z',
      estado: true,
      createdAt: '2025-08-12T17:29:16.000Z',
      updatedAt: '2025-08-12T17:29:16.000Z'
    }
  })
  lote: Lote;

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

  @Column({ type: 'tinyint', default: 1 })
  @ApiProperty({ default: 1 })
  estado: number;
}
