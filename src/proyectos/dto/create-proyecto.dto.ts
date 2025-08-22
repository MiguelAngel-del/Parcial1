import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength, IsDateString, IsNumber, Min } from 'class-validator';

export class CreateProyectoDto {
  @ApiProperty({ example: 'Proyecto A', description: 'Nombre del proyecto' })
  @IsString()
  @MinLength(1)
  nombre: string;

  @ApiProperty({ example: 'Desarrollo de software', description: 'Descripción del proyecto' })
  @IsString()
  descripcion: string;

  @ApiProperty({ example: '2025-09-01', description: 'Fecha de inicio (YYYY-MM-DD)' })
  @IsDateString()
  fechaInicio: string;

  @ApiProperty({ example: '2025-12-31', description: 'Fecha de finalización (YYYY-MM-DD)' })
  @IsDateString()
  fechaFin: string;

  @ApiProperty({ example: 50, description: 'Porcentaje de completado' })
  @IsNumber()
  @Min(0)
  porcentajeCompletado: number;
}
