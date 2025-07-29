import { PartialType } from '@nestjs/mapped-types';
import { CreateVentaDto } from './create-venta.dto';
import { IsInt, IsOptional, IsNumber } from 'class-validator';
import { Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateVentaDto extends PartialType(CreateVentaDto) {
    @ApiProperty({
        description: 'Fecha de la venta a actualizar',
        example: '2023-10-01T12:00:00Z',
        required: false,
    })
    @IsOptional()
    @Transform(({ value }) => new Date(value))
    fechaVenta?: Date;

    @ApiProperty({
        description: 'ID del cliente asociado a la venta a actualizar',
        example: 1,
        required: false,
    })
    @IsInt()
    idCliente?: number;

    @ApiProperty({
        description: 'ID del usuario que realiza la venta a actualizar',
        example: 1,
        required: false,
    })
    @IsInt()
    idUsuario?: number;

    @ApiProperty({
        description: 'ID del método de pago utilizado en la venta a actualizar',
        example: 1,
        required: false,
    })
    @IsInt()
    idMetodoPago?: number;

    @ApiProperty({
        description: 'Total de la venta a actualizar',
        example: 100.50,
        required: false,
    })
    @IsNumber()
    totalVenta?: number;

    @ApiProperty({
        description: 'Subtotal de la venta a actualizar',
        example: 90.00,
        required: false,
    })
    @IsNumber()
    subtotalVenta?: number;

    @ApiProperty({
        description: 'Descuento aplicado a la venta a actualizar',
        example: 10.50,
        required: false,
    })
    @IsOptional()
    @IsNumber()
    descuentoVenta?: number;

    @ApiProperty({
        description: 'Estado de la venta a actualizar',
        example: 1,
        required: false,
    })
    @IsOptional()
    @IsInt()
    estado?: number;

    @ApiProperty({
        description: 'Estado lógico de la venta a actualizar',
        example: true,
        required: false,
    })
    @IsOptional()
    estadoVenta?: boolean;
}
