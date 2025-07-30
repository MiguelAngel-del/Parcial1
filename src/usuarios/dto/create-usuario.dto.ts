import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsInt, IsString, minLength, MinLength } from "class-validator";

export class CreateUsuarioDto {
    @ApiProperty({
        description: 'Nombre del usuario',
        example: 'Juan Pérez'
    })
    @Transform(({ value }) => value.trim())
    @IsString()
    @MinLength(1)
    nombreUsuario: string;

    @ApiProperty({
        description: 'Correo electrónico del usuario',
        example: 'exampleUsuario@gmail.com',
    })
    @Transform(({ value }) => value.trim())
    @IsString()
    @MinLength(1)
    correoUsuario: string;

    @ApiProperty({
        description: 'Contraseña del usuario',
        example: 'passwd123',
    })
    @Transform(({ value }) => value.trim())
    @IsString()
    @MinLength(1)
    contrasenaHash: string;

    @ApiProperty({
        description: 'Id del rol del usuario',
        example: 1,
    })
    @IsInt()
    idRol: number;
}
