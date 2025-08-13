import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNumber, IsOptional } from 'class-validator';

export class CreateDetalleVentaDto {
    @ApiProperty({ description: 'ID del producto', example: 1 })
    @IsInt()
    idProducto: number;

    @ApiProperty({ description: 'Cantidad vendida', example: 2 })
    @IsInt()
    cantidadVenta: number;

    @ApiProperty({ description: 'Precio unitario', example: 50.00 })
    @IsNumber()
    precioUnitarioVenta: number;

    @ApiProperty({ description: 'Descuento aplicado', example: 5.00 })
    @IsNumber()
    descuentoAplicado: number;

    @ApiProperty({ description: 'Subtotal', example: 95.00 })
    @IsNumber()
    subtotalVenta: number;

    @ApiProperty({ 
        description: 'Fecha de creación', 
        example: '2023-10-01T12:00:00Z', 
        required: false 
    })
    @IsOptional()
    createdAt?: Date;

    @ApiProperty({ 
        description: 'Fecha de actualización', 
        example: '2023-10-01T12:00:00Z', 
        required: false 
    })
    @IsOptional()
    updatedAt?: Date;
}
