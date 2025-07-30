import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsString, MinLength, IsOptional } from 'class-validator';

export class CreateMetodosPagoDto {
    @ApiProperty({
        description: 'Nombre del método de pago',
        example: 'Tarjeta de crédito',
    })
    @Transform(({ value }) => value.trim())
    @IsString()
    @MinLength(1)
    nombreMetodoPago: string;

    @ApiProperty({
        description: 'Descripción del método de pago',
        example: 'Pago con tarjeta de crédito o débito',
        required: false,
    })
    @IsOptional()
    @Transform(({ value }) => value?.trim())
    @IsString()
    descripcionMetodoPago?: string;
}
