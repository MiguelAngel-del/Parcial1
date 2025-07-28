import { PartialType } from '@nestjs/mapped-types';
import { CreateProductoDto } from './create-producto.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsBoolean, IsNumber, IsString, Min, MinLength, IsInt } from 'class-validator';
import { Transform } from 'class-transformer';

export class UpdateProductoDto extends PartialType(CreateProductoDto) {
  @ApiProperty({
    description: 'Nombre del producto a actualizar',
    example: 'iPhone 13 Pro Editado',
    required: false,
  })
  @IsOptional()
  @Transform(({ value }) => value.trim())
  @IsString()
  @MinLength(1)
  nombreProducto?: string;

  @ApiProperty({
    description: 'Descripción del producto actualizado',
    example: 'Smartphone Apple 256 GB, color azul sierra, pantalla OLED de 6.1″',
    required: false,
  })
  @IsOptional()
  @Transform(({ value }) => value.trim())
  @IsString()
  @MinLength(1)
  descripcionProducto?: string;

  @ApiProperty({
    description: 'Precio de venta actualizado',
    example: 1_099.99,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  @Min(0)
  precioVenta?: number;

  @ApiProperty({
    description: 'Precio de compra actualizado',
    example: 900.0,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  @Min(0)
  precioCompra?: number;

  @ApiProperty({
    description: 'Modelo del producto actualizado',
    example: 'A2633',
    required: false,
  })
  @IsOptional()
  @Transform(({ value }) => value.trim())
  @IsString()
  @MinLength(1)
  modeloProducto?: string;

  @ApiProperty({
    description: 'Cantidad mínima en inventario actualizada',
    example: 3,
    required: false,
  })
  @IsOptional()
  @IsInt()
  @Min(0)
  cantidadMinima?: number;

  @ApiProperty({
    description: 'Código interno o de barras actualizado',
    example: 'IP13PRO256',
    required: false,
  })
  @IsOptional()
  @Transform(({ value }) => value.trim())
  @IsString()
  @MinLength(1)
  codigoProducto?: string;

  @ApiProperty({
    description: 'URL de la imagen del producto actualizada',
    example: 'https://mi-tienda.com/images/iphone13pro-edited.png',
    required: false,
  })
  @IsOptional()
  @Transform(({ value }) => value.trim())
  @IsString()
  @MinLength(1)
  imagenProducto?: string;

  @ApiProperty({
    description: 'Unidad de medida actualizada',
    example: 'unidad',
    required: false,
  })
  @IsOptional()
  @Transform(({ value }) => value.trim())
  @IsString()
  @MinLength(1)
  unidadMedida?: string;

  @ApiProperty({
    description: 'ID de la categoría del producto',
    example: 1, //categoría "Celulares"
    required: false,
  })
  @IsOptional()
  @IsInt()
  @Min(1)
  categoriaId?: number;

  @ApiProperty({
    description: 'Estado del producto (true = activo, false = inactivo)',
    example: true,
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  estado?: boolean;
}
