import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsString, MinLength } from 'class-validator';

export class CreateCategoriaDto {
  @ApiProperty({
    description: 'Nombre de la categoría',
    example: 'Celulares',
  })
  @Transform(({ value }) => value.trim())
  @IsString()
  @MinLength(1)
  nombreCategoria: string;

  @ApiProperty({
    description: 'Descripción de la categoría',
    example: 'celulares de gama alta',
    required: false,
  })
  @Transform(({ value }) => value.trim())
  @IsString()
  @MinLength(1)
  descripcionCategoria?: string;
}