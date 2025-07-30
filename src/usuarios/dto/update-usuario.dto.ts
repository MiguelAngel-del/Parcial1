import { PartialType } from '@nestjs/mapped-types';
import { CreateUsuarioDto } from './create-usuario.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { Transform } from 'class-transformer';

export class UpdateUsuarioDto extends PartialType(CreateUsuarioDto) {
    @ApiProperty({
            description: 'Nombre del usuario',
            example: 'Usuario Actualizado',
            required: false,
        })
        @Transform(({ value }) => value.trim())
        @IsString()
        @IsNotEmpty()
        nombreUsuario?: string;
    
        @ApiProperty({
            description: 'Correo electrónico del usuario',
            example: 'updatedUsuario@gmail.com',
            required: false,
        })
        @Transform(({ value }) => value.trim())
        @IsString()
        @IsNotEmpty()
        correoUsuario?: string;
    
        @ApiProperty({
            description: 'Contraseña del usuario',
            example: 'passwdUpdated123',
            required: false,
        })
        @Transform(({ value }) => value.trim())
        @IsString()
        @IsNotEmpty()
        contrasenaHash?: string;
    
        @ApiProperty({
            description: 'Id del rol del usuario',
            example: 1,
            required: false,
        })
        @IsNotEmpty()
        idRol?: number;
}
