import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsInt, IsString, MinLength } from 'class-validator';

export class CreateClienteDto {
  @ApiProperty({
    description: 'Nombre del cliente',
    example: 'Juan Pérez',
  })
  @Transform(({ value }) => value.trim())
  @IsString()
  @MinLength(1)
  nombreCliente: string;

  @ApiProperty({
    description: 'Teléfono del cliente',
    example: '1234567890',
    required: false,
  })
  @Transform(({ value }) => value?.trim())
  @IsString()
  @MinLength(8)
  telefonoCliente?: string;

  @ApiProperty({
    description: 'Correo electrónico del cliente',
    example: 'example@gmail.com',
    required: false,
  })
  @Transform(({ value }) => value?.trim())
  @IsString()
  correoCliente?: string;

  @ApiProperty({
    description: 'NIT del cliente',
    example: '12345678',
    required: false,
  })
  @Transform(({ value }) => value?.trim())
  @IsString()
  nitCliente?: string;

  @ApiProperty({
    description: 'Se ingresa el id del municipio al que pertenece el cliente',
    example: 1,
    required: false,
  })
  @IsInt()
  idMunicipio?: number; // Opcional por el momento, 
}
