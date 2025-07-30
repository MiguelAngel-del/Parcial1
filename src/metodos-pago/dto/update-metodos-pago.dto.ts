import { PartialType } from '@nestjs/mapped-types';
import { CreateMetodosPagoDto } from './create-metodos-pago.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';

export class UpdateMetodosPagoDto extends PartialType(CreateMetodosPagoDto) {
    @ApiProperty({
        description: 'Nombre del método de pago a actualizar',
        example: 'Tarjeta de débito',
        required: false,
    })
    @IsOptional()
    @Transform(({ value }) => value?.trim())
    @IsString()
    @MinLength(1)
    nombreMetodoPago?: string;

    @ApiProperty({
        description: 'Descripción del método de pago a actualizar',
        example: 'Pago con tarjeta de débito',
        required: false,
    })
    @IsOptional()
    @Transform(({ value }) => value?.trim())
    @IsString()
    descripcionMetodoPago?: string;
}
