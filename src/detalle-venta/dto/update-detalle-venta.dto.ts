import { PartialType } from '@nestjs/mapped-types';
import { CreateDetalleVentaDto } from './create-detalle-venta.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNumber, IsOptional } from 'class-validator';

export class UpdateDetalleVentaDto extends PartialType(CreateDetalleVentaDto) {
    @ApiProperty({ 
        description: 'ID de la venta a actualizar', 
        example: 1, 
        required: false 
    })
    @IsOptional()
    @IsInt()
    idVenta?: number;

    @ApiProperty({ 
        description: 'ID del producto a actualizar', 
        example: 1, 
        required: false 
    })
    @IsOptional()
    @IsInt()
    idProducto?: number;

    @ApiProperty({ 
        description: 'Cantidad vendida a actualizar', 
        example: 3, 
        required: false 
    })
    @IsOptional()
    @IsInt()
    cantidadVenta?: number;

    @ApiProperty({ 
        description: 'Precio unitario a actualizar', 
        example: 60.00, 
        required: false 
    })
    @IsOptional()
    @IsNumber()
    precioUnitarioVenta?: number;

    @ApiProperty({ 
        description: 'Descuento aplicado a actualizar', 
        example: 2.00, 
        required: false 
    })
    @IsOptional()
    @IsNumber()
    descuentoAplicado?: number;

    @ApiProperty({ 
        description: 'Subtotal a actualizar', 
        example: 180.00, 
        required: false 
    })
    @IsOptional()
    @IsNumber()
    subtotalVenta?: number;

    @ApiProperty({
        description: 'Id metodo de pago a actualizar',
        example: 2,
        required: false,
    })
    @IsNumber()
    idMetodoPago?: number;

    @ApiProperty({
        description: 'Id del usuario que realiza la venta a actualizar',
        example: 2,
        required: false,
    })
    @IsNumber()
    idUsuario?: number;

    @ApiProperty({
        description: 'Id del cliente al que se le realiza la venta a actualizar',
        example: 2,
        required: false,
    })
    @IsNumber()
    idCliente?: number;


    @ApiProperty({ 
        description: 'Fecha de creación a actualizar', 
        example: '2023-10-01T12:00:00Z', 
        required: false 
    })
    @IsOptional()
    createdAt?: Date;

    @ApiProperty({ 
        description: 'Fecha de actualización a actualizar', 
        example: '2023-10-01T12:00:00Z', 
        required: false 
    })
    @IsOptional()
    updatedAt?: Date;
}
