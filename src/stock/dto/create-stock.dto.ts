import { ApiProperty } from '@nestjs/swagger';
import { IsInt, Min, IsNotEmpty } from 'class-validator';

export class CreateStockDto {
  @ApiProperty({
    description: 'id del producto relacionado (ej. iPhone 13 Pro)',
    example: 1,
  })
  @IsInt()
  @Min(1)
  @IsNotEmpty()
  idProducto: number;

  @ApiProperty({
    description: 'id del lote relacionado (ej. lote de julio 2025)',
    example: 3,
  })
  @IsInt()
  @Min(1)
  @IsNotEmpty()
  idLote: number;

  @ApiProperty({
    description: 'Cantidad de stock disponible para este producto en el lote',
    example: 25,
  })
  @IsInt()
  @Min(0)
  @IsNotEmpty()
  cantidadStock: number;
}
