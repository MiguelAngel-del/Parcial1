import { PartialType } from '@nestjs/mapped-types';
import { CreateReglasDescuentoDto } from './create-reglas-descuento.dto';
import { IsInt, IsNumber, IsOptional, Max, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateReglasDescuentoDto extends PartialType(
  CreateReglasDescuentoDto,
) {
  @ApiProperty({
    description: 'Porcentaje de descuento aplicado',
    example: 25,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(100)
  porcentajeDescuento?: number;
}
