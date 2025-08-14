import { ApiProperty } from '@nestjs/swagger';

export class ClienteResponseDto {
  @ApiProperty()
  idCliente: number;

  @ApiProperty()
  nombreCliente: string;

  @ApiProperty()
  telefonoCliente: string;

  @ApiProperty()
  correoCliente: string;

  @ApiProperty()
  nitCliente: string;

  @ApiProperty()
  estado: number;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty({ example: 1, description: 'ID del municipio' })
  idMunicipio: number;

  @ApiProperty({ example: 1, description: 'ID del departamento' })
  idDepartamento: number;

  @ApiProperty({ example: 1, description: 'ID del usuario vinculado', required: false })
  idUsuario?: number;
}
