import { PartialType } from '@nestjs/mapped-types';
import { CreateDetalleCompraSimpleDto } from './create-detalle-compra.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNumber, IsOptional, IsDateString } from 'class-validator';

export class UpdateDetalleCompraDto extends PartialType(CreateDetalleCompraSimpleDto) {
  @ApiProperty({
    description: 'ID de la compra a actualizar',
    example: 1,
    required: false,
  })
  @IsOptional()
  @IsInt()
  idCompra?: number;

  @ApiProperty({
    description: 'ID del producto a actualizar',
    example: 1,
    required: false,
  })
  @IsOptional()
  @IsInt()
  idProducto?: number;

  @ApiProperty({
    description: 'Cantidad comprada a actualizar',
    example: 5,
    required: false,
  })
  @IsOptional()
  @IsInt()
  cantidadCompra?: number;

  @ApiProperty({
    description: 'Precio unitario de la compra a actualizar',
    example: 10.5,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  precioUnitarioCompra?: number;

  @ApiProperty({
    description: 'Subtotal de la compra a actualizar',
    example: 52.5,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  subtotalCompra?: number;

  @ApiProperty({
    description: 'Fecha de creación a actualizar',
    example: '2023-10-01T12:00:00Z',
    required: false,
  })
  @IsOptional()
  @IsDateString()
  createdAt?: Date;

  @ApiProperty({
    description: 'Fecha de actualización a actualizar',
    example: '2023-10-01T12:00:00Z',
    required: false,
  })
  @IsOptional()
  @IsDateString()
  updatedAt?: Date;
}
