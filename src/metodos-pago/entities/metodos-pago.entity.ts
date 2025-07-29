import { Column, Entity, JoinColumn, OneToMany,PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Venta } from 'src/ventas/entities/venta.entity';

@Entity({ name: 'metodos_pago' })
export class MetodoPago {
    @PrimaryGeneratedColumn()
    @ApiProperty()
    idMetodoPago: number;

    @Column("varchar", { length: 255 })
    @ApiProperty()
    nombreMetodoPago: string;

    @Column({ type: 'tinyint', default: 1 })
    estado: number;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
    @ApiProperty()
    createdAt: Date;
    
    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    @ApiProperty()
    updatedAt: Date;

    @OneToMany(() => Venta, venta => venta.metodoPago)
    @JoinColumn({ name: 'IdVenta' })
    @ApiProperty({ type: () => Venta })
    ventas: Venta;
}
