import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsString, MinLength, IsOptional, IsInt} from 'class-validator';

export class CreateProveedoreDto {
    @ApiProperty({
        description: 'Nombre del proveedor',
        example: 'Proveedor Ejemplo',
    })
    @Transform(({ value }) => value.trim())
    @IsString()
    @MinLength(1)
    nombreProveedor: string;
    
    @ApiProperty({
        description: 'Teléfono del proveedor',
        example: '123456789',
    })
    @Transform(({ value }) => value.trim())
    @IsString()
    @MinLength(1)
    telefonoProveedor: string;
    
    @ApiProperty({
        description: 'Dirección del proveedor',
        example: 'Calle Falsa 123',
    })
    @Transform(({ value }) => value.trim())
    @IsString()
    @MinLength(1)
    direccionProveedor: string;

    @ApiProperty({
        description: 'ID del municipio asociado al proveedor',
        example: 1,
        required: false,
        type: Number,
    })
    
    @IsInt()
    idMunicipio?: number;
}
