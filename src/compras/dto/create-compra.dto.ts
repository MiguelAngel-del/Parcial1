import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsDateString, IsInt, Min } from 'class-validator';

export class CreateCompraDto {
  @ApiProperty({ description: 'Total de la compra', example: 1500.50 })
  @IsNumber()
  @Min(0)
  totalCompra: number;

  @ApiProperty({ description: 'Id del proveedor', example: 2 })
  @IsInt()
  idProveedor: number;

  @ApiProperty({ description: 'Id del usuario', example: 5 })
  @IsInt()
  idUsuario: number;
}
