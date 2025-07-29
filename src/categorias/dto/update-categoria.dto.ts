import { PartialType } from '@nestjs/mapped-types';
import { CreateCategoriaDto } from './create-categoria.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsOptional, IsString, MinLength } from 'class-validator';
import { Transform } from 'class-transformer';

export class UpdateCategoriaDto extends PartialType(CreateCategoriaDto) {
  @ApiProperty({
    description: 'Nombre de la categoría a actualizar',
    example: 'Celulares Editado',
    required: false,
  })
  @IsOptional()
  @Transform(({ value }) => value.trim())
  @IsString()
  @MinLength(1)
  nombreCategoria?: string;

  @ApiProperty({
    description: 'Descripción de la categoría',
    example: 'celulares actuzalizados de gama alta',
    required: false,
  })
  @IsOptional()
  @Transform(({ value }) => value.trim())
  @IsString()
  @MinLength(1)
  descripcionCategoria?: string;
}