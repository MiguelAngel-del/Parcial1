import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsString, MinLength } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateLoteDto {
  @ApiProperty({
    description: 'Fecha de vencimiento del lote',
    example: '2024-12-31',
  })
  @IsDateString()
  fechaVencimiento: Date;

  @ApiProperty({
    description: 'Número único del lote',
    example: 'LOTE-2023-001',
  })
  @Transform(({ value }) => value.trim())
  @IsString()
  @MinLength(3)
  numeroLote: string;
}