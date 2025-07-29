import { ApiProperty } from '@nestjs/swagger';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Stock } from '../../stock/entities/stock.entity';

@Entity({ name: 'lotes' })
export class Lote {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  idLote: number;

  @Column({ type: 'date' })
  @ApiProperty()
  fechaVencimiento: Date;

  @Column({ length: 50 })
  @ApiProperty()
  numeroLote: string;

  @Column({ default: true })
  @ApiProperty()
  estado: boolean;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  @ApiProperty()
  createdAt: Date;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  @ApiProperty()
  updatedAt: Date;

  @OneToMany(() => Stock, stock => stock.lote)
  stocks: Stock[];
}