import { PartialType } from '@nestjs/mapped-types';
import { CreateClienteDto } from './create-cliente.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsOptional, IsString, Min, MinLength } from 'class-validator';
import { Transform } from 'class-transformer';

export class UpdateClienteDto extends PartialType(CreateClienteDto) {
  @ApiProperty({
    description: 'Nombre del cliente',
    example: 'Juan Pérez',
    required: false,
  })
  @IsOptional()
  @Transform(({ value }) => value.trim())
  @IsString()
  @MinLength(1)
  nombreCliente?: string;

  @ApiProperty({
    description: 'Teléfono del cliente',
    example: '1234567890',
    required: false,
  })
  @IsOptional()
  @Transform(({ value }) => value.trim())
  @IsString()
  @MinLength(8)
  telefonoCliente?: string;

  @ApiProperty({
    description: 'Correo electrónico del cliente',
    example: 'exampleUpdated@gmail.com',
    required: false,
  })
  @IsOptional()
  @Transform(({ value }) => value.trim())
  @IsString()
  @MinLength(5)
  correoCliente?: string;

  @ApiProperty({
    description: 'NIT del cliente',
    example: '1234567890',
    required: false,
  })
  @IsOptional()
  @Transform(({ value }) => value.trim())
  @IsString()
  @MinLength(5)
  nitCliente?: string;

  @ApiProperty({
    description: 'ID del municipio',
    example: 1,
    required: false,
  })
  @IsOptional()
  @IsInt()
  idMunicipio?: number;
}
