import { ApiProperty } from '@nestjs/swagger';
import { Column, Decimal128, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'reglasdescuento' })
export class ReglasDescuento {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  idRegla: number;

  @Column({ nullable: true })
  @ApiProperty()
  porcentajeDescuento: number;

  @Column({ type: 'tinyint', default: 1, nullable: true })
  estado: number;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  @ApiProperty()
  createdAt: Date;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  @ApiProperty()
  updatedAt: Date;
}
