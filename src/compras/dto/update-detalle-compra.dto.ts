import { PartialType } from '@nestjs/mapped-types';
import { CreateDetalleCompraDto } from './create-detalle-compra.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsInt, IsNumber, Min } from 'class-validator';

export class UpdateDetalleCompraDto extends PartialType(CreateDetalleCompraDto) {
  @ApiProperty({ required: false, description: 'Cantidad comprada', example: 10 })
  @IsOptional()
  @IsInt()
  @Min(1)
  cantidad?: number;

  @ApiProperty({ required: false, description: 'Precio unitario de compra', example: 100.5 })
  @IsOptional()
  @IsNumber()
  @Min(0)
  precioUnitario?: number;
}
