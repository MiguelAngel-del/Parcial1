import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class LoginDto {
  @ApiProperty({
    description: 'Nombre de usuario o correo electrónico',
    example: 'juan123 o juan@ejemplo.com',
  })
  @IsString()
  identificador: string;

  @ApiProperty({
    description: 'Contraseña en texto plano',
    example: 'password123',
  })
  @IsString()
  contrasena: string;
}
// DTO para el refresh token
export class RefreshTokenDto {
  @ApiProperty({
    description: 'Refresh token para obtener nuevo access token',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
    required: true,
  })
  @IsString()
  refresh_token: string;
}
