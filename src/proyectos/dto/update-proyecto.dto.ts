import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, MinLength, IsDateString, IsNumber, Min } from 'class-validator';

export class UpdateProyectoDto {
  @ApiProperty({ example: 'Proyecto A', description: 'Nombre del proyecto', required: false })
  @IsOptional()
  @IsString()
  @MinLength(1)
  nombre?: string;

  @ApiProperty({ example: 'Desarrollo de software', description: 'Descripción del proyecto', required: false })
  @IsOptional()
  @IsString()
  descripcion?: string;

  @ApiProperty({ example: '2025-09-01', description: 'Fecha de inicio (YYYY-MM-DD)', required: false })
  @IsOptional()
  @IsDateString()
  fechaInicio?: string;

  @ApiProperty({ example: '2025-12-31', description: 'Fecha de finalización (YYYY-MM-DD)', required: false })
  @IsOptional()
  @IsDateString()
  fechaFin?: string;

  @ApiProperty({ example: 80, description: 'Porcentaje actualizado', required: false })
  @IsOptional()
  @IsNumber()
  @Min(0)
  porcentajeCompletado?: number;
}
