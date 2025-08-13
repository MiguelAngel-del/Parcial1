import { ApiProperty } from '@nestjs/swagger';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Producto } from '../../productos/entities/producto.entity';
import { Lote } from '../../lotes/entities/lote.entity';

@Entity({ name: 'stock' })
export class Stock {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  idStock: number;

  @ManyToOne(() => Producto, producto => producto.stocks)
  @JoinColumn({ name: 'idProducto' })
  @ApiProperty({ type: () => Producto })
  producto: Producto;

  @ManyToOne(() => Lote, lote => lote.stocks)
  @JoinColumn({ name: 'idLote' })
  @ApiProperty({ type: () => Lote })
  lote: Lote;

  @Column('int')
  @ApiProperty()
  cantidadStock: number;

  @Column({ default: true })
  @ApiProperty()
  estado: boolean;

  @CreateDateColumn({ type: 'datetime' })
  @ApiProperty()
  createdAt: Date;

  @UpdateDateColumn({ type: 'datetime' })
  @ApiProperty()
  updatedAt: Date;
}