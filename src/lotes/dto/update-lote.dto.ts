import { PartialType } from '@nestjs/swagger';
import { CreateLoteDto } from './create-lote.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsOptional, IsString, MinLength, IsBoolean } from 'class-validator';
import { Transform } from 'class-transformer';

export class UpdateLoteDto extends PartialType(CreateLoteDto) {
  @ApiProperty({
    description: 'Fecha de vencimiento actualizada',
    example: '2025-01-15',
    required: false,
  })
  @IsOptional()
  @IsDateString()
  fechaVencimiento?: Date;

  @ApiProperty({
    description: 'Número de lote actualizado',
    example: 'LOTE-2023-001-REV',
    required: false,
  })
  @IsOptional()
  @Transform(({ value }) => value.trim())
  @IsString()
  @MinLength(3)
  numeroLote?: string;

  @ApiProperty({
    description: 'Estado del lote',
    example: true,
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  estado?: boolean;
}