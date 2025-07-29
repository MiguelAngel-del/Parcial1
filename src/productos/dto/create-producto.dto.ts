import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsString,
  MinLength,
  IsOptional,
  IsNumber,
  Min,
  IsInt,
} from 'class-validator';

export class CreateProductoDto {
  @ApiProperty({
    description: 'Nombre del producto',
    example: 'iPhone 13 Pro',
  })
  @Transform(({ value }) => value.trim())
  @IsString()
  @MinLength(1)
  nombreProducto: string;

  @ApiProperty({
    description: 'Descripción del producto',
    example: 'Smartphone Apple 128 GB, color grafito, con pantalla OLED de 6.1″',
    required: false,
  })
  @IsOptional()
  @Transform(({ value }) => value.trim())
  @IsString()
  @MinLength(1)
  descripcionProducto?: string;

  @ApiProperty({
    description: 'Precio de venta',
    example: 999.99,
  })
  @IsNumber()
  @Min(0)
  precioVenta: number;

  @ApiProperty({
    description: 'Precio de compra',
    example: 850.00,
  })
  @IsNumber()
  @Min(0)
  precioCompra: number;

  @ApiProperty({
    description: 'Modelo del producto',
    example: 'A2633',
    required: false,
  })
  @IsOptional()
  @Transform(({ value }) => value.trim())
  @IsString()
  @MinLength(1)
  modeloProducto?: string;

  @ApiProperty({
    description: 'Cantidad mínima en inventario',
    example: 5,
    required: false,
  })
  @IsOptional()
  @IsInt()
  @Min(0)
  cantidadMinima?: number;

  @ApiProperty({
    description: 'Código interno o de barras',
    example: 'IP13PRO128',
    required: false,
  })
  @IsOptional()
  @Transform(({ value }) => value.trim())
  @IsString()
  @MinLength(1)
  codigoProducto?: string;

  @ApiProperty({
    description: 'URL de la imagen del producto',
    example: 'https://mi-tienda.com/images/iphone13pro.png',
    required: false,
  })
  @IsOptional()
  @Transform(({ value }) => value.trim())
  @IsString()
  @MinLength(1)
  imagenProducto?: string;

  @ApiProperty({
    description: 'Unidad de medida',
    example: 'unidad',
    required: false,
  })
  @IsOptional()
  @Transform(({ value }) => value.trim())
  @IsString()
  @MinLength(1)
  unidadMedida?: string;

  @ApiProperty({
    description: 'ID de la categoría a la que pertenece el producto',
    example: 1,
  })
  @IsInt()
  @Min(1)
  categoriaId: number;
}
