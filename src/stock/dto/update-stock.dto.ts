import { PartialType } from '@nestjs/swagger';
import { CreateStockDto } from './create-stock.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsInt, IsOptional, Min } from 'class-validator';

export class UpdateStockDto extends PartialType(CreateStockDto) {
  @ApiProperty({
    description: 'Nueva cantidad de stock',
    example: 50,
    required: false,
  })
  @IsOptional()
  @IsInt()
  @Min(0)
  cantidadStock?: number;

  @ApiProperty({
    description: 'Estado del registro de stock',
    example: true,
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  estado?: boolean;

  // Agregar explícitamente las relaciones como opcionales
  @ApiProperty({
    description: 'ID del producto relacionado',
    example: 1,
    required: false,
  })
  @IsOptional()
  @IsInt()
  @Min(1)
  idProducto?: number;

  @ApiProperty({
    description: 'ID del lote relacionado',
    example: 1,
    required: false,
  })
  @IsOptional()
  @IsInt()
  @Min(1)
  idLote?: number;
}