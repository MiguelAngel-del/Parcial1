import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsOptional, IsNumber, ValidateNested } from 'class-validator';
import { CreateDetalleVentaDto } from '../../detalle-venta/dto/create-detalle-venta.dto';

export class CreateVentaDto {
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
    @ApiProperty({
        description: 'Detalles de la venta (arreglo de productos)',
        type: [CreateDetalleVentaDto],
        example: [
            {
                idProducto: 1,
                cantidadVenta: 2,
                precioUnitarioVenta: 50.00,
                descuentoAplicado: 5.00,
                subtotalVenta: 95.00
            },
            {
                idProducto: 2,
                cantidadVenta: 1,
                precioUnitarioVenta: 45.00,
                descuentoAplicado: 0.00,
                subtotalVenta: 45.00
            }
        ]
    })
    @ValidateNested({ each: true })
    @Type(() => CreateDetalleVentaDto)
    detalles: CreateDetalleVentaDto[];
}
