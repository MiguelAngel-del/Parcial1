import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsInt, Min, ValidateNested, ArrayMinSize } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateDetalleCompraDto } from './create-detalle-compra.dto';

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

  @ApiProperty({
    description: 'Detalles de la compra',
    type: [CreateDetalleCompraDto],
    example: [
      { idProducto: 1, cantidad: 10, precioUnitario: 100.5 },
      { idProducto: 2, cantidad: 5, precioUnitario: 50 }
    ]
  })
  @ValidateNested({ each: true })
  @Type(() => CreateDetalleCompraDto)
  @ArrayMinSize(1)
  detalles: CreateDetalleCompraDto[];
}
