import { ApiProperty } from '@nestjs/swagger';
import { Cliente } from 'src/clientes/entities/cliente.entity';
import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Usuario } from 'src/usuarios/entities/usuario.entity';
import { MetodoPago } from 'src/metodos-pago/entities/metodos-pago.entity';

@Entity({ name: 'ventas' })
export class Venta {
    @PrimaryGeneratedColumn()
    @ApiProperty()
    idVenta: number;
    
    @Column("decimal", { precision: 10, scale: 2 })
    @ApiProperty()
    totalVenta: number;

    @Column("decimal", { precision: 10, scale: 2 })
    @ApiProperty()
    subtotalVenta: number;

    @Column("decimal", { precision: 10, scale: 2 })
    @ApiProperty()
    descuentoVenta: number;

    @Column({ type: 'tinyint', default: 1 })
    @ApiProperty()
    estado: number;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    @ApiProperty()
    createdAt: Date;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    @ApiProperty()
    updatedAt: Date;

   @ManyToOne(() => Cliente, cliente => cliente.ventas)
    @JoinColumn({ name: 'idCliente' })
    @ApiProperty({ type: () => Cliente })
    cliente: Cliente;
    
    @ManyToOne(() => Usuario, usuario => usuario.ventas)
    @JoinColumn({ name: 'idUsuario' })
    @ApiProperty({ type: () => Usuario })
    usuario: Usuario;
    
    @ManyToOne(() => MetodoPago, metodoPago => metodoPago.ventas)
    @JoinColumn({ name: 'idMetodoPago' })
    @ApiProperty({ type: () => MetodoPago })
    metodoPago: MetodoPago;
}
