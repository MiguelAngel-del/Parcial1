import { PartialType } from '@nestjs/mapped-types';
import { CreateRoleDto } from './create-role.dto';
import { IsInt, IsOptional, IsString, MinLength } from 'class-validator';
import { Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateRoleDto extends PartialType(CreateRoleDto) {
  @ApiProperty({
    description: 'Nombre del rol a actualizar',
    example: 'Administrador corregido',
    required: false,
  })
  @IsOptional()
  @Transform(({ value }) => value.trim())
  @IsString()
  @MinLength(1)
  nombreRol?: string;

  @ApiProperty({
    description: 'Estado del rol (1 = activo, 0 = inactivo)',
    example: 1,
    required: false, // En este caso si un campo es opcional se pone required: false
  })
  @IsOptional()
  @IsInt()
  estado?: number;
}
