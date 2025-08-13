import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNumber, Min } from 'class-validator';

export class CreateDetalleCompraSimpleDto {
  @ApiProperty({ example: 1, description: 'ID de la compra' })
  @IsInt()
  idCompra: number;

  @ApiProperty({ example: 1, description: 'ID del producto' })
  @IsInt()
  idProducto: number;

  @ApiProperty({ example: 5, description: 'Cantidad comprada' })
  @IsInt()
  @Min(1)
  cantidadCompra: number;

  @ApiProperty({ example: 10.50, description: 'Precio unitario de la compra' })
  @IsNumber()
  precioUnitarioCompra: number;

  @ApiProperty({ example: 52.50, description: 'Subtotal de la compra' })
  @IsNumber()
  subtotalCompra: number;
}
