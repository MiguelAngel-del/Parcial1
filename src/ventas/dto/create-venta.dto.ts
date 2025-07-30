import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsInt, IsOptional, IsNumber } from 'class-validator';

export class CreateVentaDto {
    @ApiProperty({
        description: 'Fecha de la venta',
        example: '2023-10-01T12:00:00Z',
    })
    @Transform(({ value }) => new Date(value))
    fechaVenta: Date;

    @ApiProperty({
        description: 'ID del cliente asociado a la venta',
        example: 1,
    })
    @IsInt()
    idCliente: number;

    @ApiProperty({
        description: 'ID del usuario que realiza la venta',
        example: 1,
    })
    @IsInt()
    idUsuario: number;

    @ApiProperty({
        description: 'ID del método de pago utilizado en la venta',
        example: 1,
    })
    @IsInt()
    idMetodoPago: number;

    @ApiProperty({
        description: 'Total de la venta',
        example: 100.50,
    })
    @IsNumber()
    totalVenta: number;

    @ApiProperty({
        description: 'Subtotal de la venta',
        example: 90.00,
    })
    @IsNumber()
    subtotalVenta: number;

    @ApiProperty({
        description: 'Descuento aplicado a la venta',
        example: 10.50,
    })
    @IsNumber()
    descuentoVenta: number;

    @ApiProperty({
        description: 'Estado de la venta',
        example: 1,
        required: false,
    })
    @IsOptional()
    @IsInt()
    estado?: number;

    @ApiProperty({
        description: 'Estado lógico de la venta',
        example: true,
        required: false,
    })
    @IsOptional()
    estadoVenta?: boolean;
}
