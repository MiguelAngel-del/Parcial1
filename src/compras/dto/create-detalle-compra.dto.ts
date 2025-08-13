import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNumber, Min, IsString, IsDateString } from 'class-validator';

export class CreateDetalleCompraDto {
  @ApiProperty({ description: 'ID del producto', example: 1 })
  @IsInt()
  idProducto: number;

  @ApiProperty({ description: 'Cantidad comprada', example: 10 })
  @IsInt()
  @Min(1)
  cantidad: number;

  @ApiProperty({ description: 'Precio unitario de compra', example: 100.5 })
  @IsNumber()
  @Min(0)
  precioUnitario: number;

  @ApiProperty({ description: 'Número de lote', example: 'L-2025-001' })
  @IsString()
  numeroLote: string;

  @ApiProperty({ description: 'Fecha de vencimiento del lote', example: '2025-12-31' })
  @IsDateString()
  fechaVencimiento: Date;
}
