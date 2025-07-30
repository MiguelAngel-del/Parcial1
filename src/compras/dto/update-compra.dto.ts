import { PartialType } from '@nestjs/mapped-types';
import { CreateCompraDto } from './create-compra.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNumber, IsOptional, Min } from 'class-validator';

export class UpdateCompraDto extends PartialType(CreateCompraDto) {
  @ApiProperty({
    description: 'Total de la compra',
    example: 1500.5,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  @Min(0)
  totalCompra?: number;

  @ApiProperty({
    description: 'Id del estado de la compra',
    example: 1,
    required: false,
  })
  @IsOptional()
  @IsInt()
  estadoCompra?: number;

  @ApiProperty({
    description: 'Id del proveedor',
    example: 1,
    required: false,
  })
  @IsOptional()
  @IsInt()
  idProveedor?: number;

  @ApiProperty({
    description: 'Id del usuario que realizó la compra',
    example: 1,
    required: false,
  })
  @IsOptional()
  @IsInt()
  idUsuario?: number;
}
