import { PartialType } from '@nestjs/mapped-types';
import { CreateProveedoreDto } from './create-proveedore.dto';
import { IsInt, IsOptional, IsString, MinLength } from 'class-validator';
import { Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateProveedoreDto extends PartialType(CreateProveedoreDto) {
    @ApiProperty({
        description: 'Nombre del proveedor a actualizar',
        example: 'Proveedor Ejemplo Actualizado',
        required: false,
    })
    @IsOptional()
    @Transform(({ value }) => value.trim())
    @IsString()
    @MinLength(1)
    nombreProveedor?: string;
    
    @ApiProperty({
        description: 'Teléfono del proveedor a actualizar',
        example: '987654321',
        required: false,
    })
    @IsOptional()
    @Transform(({ value }) => value.trim())
    @IsString()
    @MinLength(1)
    telefonoProveedor?: string;
    
    @ApiProperty({
        description: 'Dirección del proveedor a actualizar',
        example: 'Avenida Siempre Viva 456',
        required: false,
    })
    @IsOptional()
    @Transform(({ value }) => value.trim())
    @IsString()
    @MinLength(1)
    direccionProveedor?: string;

    @ApiProperty({
        description: 'ID del municipio asociado al proveedor a actualizar',
        example: 2,
        required: false,
        type: Number,
    })
    @IsOptional()
    @Transform(({ value }) => parseInt(value, 10))
    @IsInt()
    idMunicipio?: number;
}
