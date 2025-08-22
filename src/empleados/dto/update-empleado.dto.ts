import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, MinLength, IsEmail, IsNumber, Min, IsDateString } from 'class-validator';

export class UpdateEmpleadoDto {
  @ApiProperty({ example: 'Juan', description: 'Nombre del empleado', required: false })
  @IsOptional()
  @IsString()
  @MinLength(1)
  nombre?: string;

  @ApiProperty({ example: 'Pérez', description: 'Apellido del empleado', required: false })
  @IsOptional()
  @IsString()
  @MinLength(1)
  apellido?: string;

  @ApiProperty({ example: 'juan.perez@email.com', description: 'Email del empleado', required: false })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiProperty({ example: '5551234567', description: 'Teléfono del empleado', required: false })
  @IsOptional()
  @IsString()
  telefono?: string;

  @ApiProperty({ example: 'Calle 123, Ciudad', description: 'Dirección del empleado', required: false })
  @IsOptional()
  @IsString()
  direccion?: string;

  @ApiProperty({ example: '1990-01-01', description: 'Fecha de nacimiento (YYYY-MM-DD)', required: false })
  @IsOptional()
  @IsDateString()
  fechaNacimiento?: string;

  @ApiProperty({ example: 'Desarrollador', description: 'Puesto de trabajo', required: false })
  @IsOptional()
  @IsString()
  puesto?: string;

  @ApiProperty({ example: 1500.00, description: 'Salario mensual', required: false })
  @IsOptional()
  @IsNumber()
  @Min(0)
  salario?: number;

  @ApiProperty({ example: '2020-05-01', description: 'Fecha de ingreso (YYYY-MM-DD)', required: false })
  @IsOptional()
  @IsDateString()
  fechaIngreso?: string;
}
