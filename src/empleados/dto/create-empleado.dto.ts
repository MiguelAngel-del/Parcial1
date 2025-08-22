import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength, IsEmail, IsNumber, Min, IsDateString } from 'class-validator';

export class CreateEmpleadoDto {
  @ApiProperty({ example: 'Miguel', description: 'Nombre del empleado' })
  @IsString()
  @MinLength(1)
  nombre: string;

  @ApiProperty({ example: 'Garcia', description: 'Apellido del empleado' })
  @IsString()
  @MinLength(1)
  apellido: string;

  @ApiProperty({ example: 'migue@email.com', description: 'Email del empleado' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: '32416137', description: 'Teléfono del empleado' })
  @IsString()
  telefono: string;

  @ApiProperty({ example: 'Zona 2 Totonicapan, Ciudad', description: 'Dirección del empleado' })
  @IsString()
  direccion: string;

  @ApiProperty({ example: '2003-01-01', description: 'Fecha de nacimiento (YYYY-MM-DD)' })
  @IsDateString()
  fechaNacimiento: string;

  @ApiProperty({ example: 'Desarrollador', description: 'Puesto de trabajo' })
  @IsString()
  puesto: string;

  @ApiProperty({ example: 2500.00, description: 'Salario mensual' })
  @IsNumber()
  @Min(0)
  salario: number;

  @ApiProperty({ example: '2020-05-01', description: 'Fecha de ingreso (YYYY-MM-DD)' })
  @IsDateString()
  fechaIngreso: string;
}
