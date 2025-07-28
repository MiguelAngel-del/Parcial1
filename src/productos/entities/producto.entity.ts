import { ApiProperty } from '@nestjs/swagger';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, JoinColumn } from 'typeorm';
import { Categoria } from '../../categorias/entities/categoria.entity';
import { Stock } from '../../stock/entities/stock.entity';

@Entity({ name: 'productos' })
export class Producto {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  idProducto: number;

  @Column({ length: 100 })
  @ApiProperty()
  nombreProducto: string;

  @Column('text', { nullable: true })
  @ApiProperty({ nullable: true })
  descripcionProducto?: string;

  @Column('decimal', { precision: 10, scale: 2 })
  @ApiProperty()
  precioVenta: number;

  @Column('decimal', { precision: 10, scale: 2 })
  @ApiProperty()
  precioCompra: number;

  @Column({ length: 100, nullable: true })
  @ApiProperty({ nullable: true })
  modeloProducto?: string;

  @Column('int', { nullable: true })
  @ApiProperty({ nullable: true })
  cantidadMinima?: number;

  @Column({ length: 100, nullable: true })
  @ApiProperty({ nullable: true })
  codigoProducto?: string;

  @Column({ length: 100, nullable: true })
  @ApiProperty({ nullable: true })
  imagenProducto?: string;

  @Column({ length: 20, nullable: true })
  @ApiProperty({ nullable: true })
  unidadMedida?: string;

  @ManyToOne(() => Categoria, (categoria) => categoria.productos, { eager: true })
  @JoinColumn({ name: 'idCategoria' })
  @ApiProperty({ type: () => Categoria })
  categoria: Categoria;

  @Column({ default: true })
  @ApiProperty()
  estado: boolean;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  @ApiProperty()
  createdAt: Date;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  @ApiProperty()
  updatedAt: Date;

  @OneToMany(() => Stock, (stock) => stock.producto)
  stocks: Stock[];
}
