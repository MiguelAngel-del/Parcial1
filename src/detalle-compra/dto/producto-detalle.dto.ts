import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsInt, Min, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class ProductoDetalleDto {
  @ApiProperty({ example: 1, description: 'ID del producto' })
  @IsInt()
  idProducto: number;

  @ApiProperty({ example: 5, description: 'Cantidad comprada' })
  @IsInt()
  @Min(1)
  cantidadCompra: number;

  @ApiProperty({ example: 10.50, description: 'Precio unitario' })
  @IsNumber()
  precioUnitarioCompra: number;

  @ApiProperty({ example: 52.50, description: 'Subtotal' })
  @IsNumber()
  subtotalCompra: number;
}

export class CreateCompraDto {
  @ApiProperty({ description: 'Total de la compra', example: 1500.50 })
  @IsNumber()
  @Min(0)
  totalCompra: number;

  @ApiProperty({ description: 'Id del proveedor', example: 2 })
  @IsInt()
  idProveedor: number;

  @ApiProperty({ description: 'Id del usuario', example: 5 })
  @IsInt()
  idUsuario: number;

  @ApiProperty({ type: [ProductoDetalleDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProductoDetalleDto)
  productos: ProductoDetalleDto[];
}