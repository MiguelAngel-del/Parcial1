import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsString, MinLength } from 'class-validator';

export class CreateRoleDto {
  @ApiProperty({                    //Esto es lo que se agrega para los endpoints de Swagger
    description: 'Nombre del rol',  // Una pequeña descripción del campo
    example: 'Administrador',       // Se pueden poner ejemplos para los campos
  })
  @Transform(({ value }) => value.trim())
  @IsString()
  @MinLength(1)
  nombreRol: string;
}
