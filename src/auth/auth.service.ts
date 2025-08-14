import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsuariosService } from '../usuarios/usuarios.service';
import { ClientesService } from '../clientes/clientes.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';


@Injectable()
export class AuthService {
  constructor(
    private usuariosService: UsuariosService,
    private clientesService: ClientesService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async validateUser(identificador: string, contrasena: string): Promise<any> {
    const usuario = 
      await this.usuariosService.findByEmail(identificador) || 
      await this.usuariosService.findByUsername(identificador);
    
    if (!usuario) {
      return null;
    }
    
    const isPasswordValid = await bcrypt.compare(contrasena, usuario.contrasenaHash);
    
    if (!isPasswordValid) {
      return null;
    }

    const { contrasenaHash: _, ...result } = usuario;
    return result;
  }

  async login(user: any) {
    // Buscar el cliente relacionado al usuario
    const cliente = await this.clientesService.getClienteByUsuarioId(user.idUsuario);

    const accessToken = this.generateAccessToken(user);
    const refreshToken = this.generateRefreshToken(user);

    return {
      access_token: accessToken,
      refresh_token: refreshToken,
      user: {
        idUsuario: user.idUsuario,
        nombreUsuario: user.nombreUsuario,
        correoUsuario: user.correoUsuario,
        rol: user.rol,
        idCliente: cliente?.idCliente ?? null
      }
    };
  }

  private generateAccessToken(user: any): string {
    const payload = { 
      sub: user.idUsuario, 
      correoUsuario: user.correoUsuario,
      rol: user.rol 
    };
    return this.jwtService.sign(payload, {
      expiresIn: this.configService.get('JWT_EXPIRES_IN', '5m') // 5 minutos
    });
  }

  private generateRefreshToken(user: any): string {
    const payload = { 
      sub: user.idUsuario,
      tokenType: 'refresh',
      iat: Math.floor(Date.now() / 1000) // Marca de tiempo en segundos
    };
    
    return this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_REFRESH_SECRET'),
      expiresIn: this.configService.get('JWT_REFRESH_EXPIRES_IN', '30m') // 30 minutos
    });
  }

  async refreshTokens(refreshToken: string) {
    try {
      const payload = this.jwtService.verify(refreshToken, {
        secret: this.configService.get('JWT_REFRESH_SECRET')
      });

      if (payload.tokenType !== 'refresh') {
        throw new UnauthorizedException('Tipo de token inválido');
      }

      // Verificar inactividad (5 minutos máximo)
      const now = Math.floor(Date.now() / 1000);
      const inactiveTime = now - payload.iat; // Tiempo transcurrido en segundos
      const maxInactive = 5 * 60; // 5 minutos en segundos

      if (inactiveTime > maxInactive) {
        throw new UnauthorizedException('Sesión expirada por inactividad');
      }

      const user = await this.usuariosService.findOne(payload.sub);
      if (!user) {
        throw new UnauthorizedException('Usuario no encontrado');
      }

      // Generar NUEVO refresh token con tiempo actualizado
      const newRefreshToken = this.generateRefreshToken(user);
      
      return {
        access_token: this.generateAccessToken(user),
        refresh_token: newRefreshToken,
      };
    } catch (error) {
      throw new UnauthorizedException('Sesión expirada: ' + error.message);
    }
  }
  async findOne(idUsuario: number) {
    const usuario = await this.usuariosService.findOne(idUsuario); // ← usa findOne
    if (!usuario) return null;

    const { contrasenaHash, ...safeUser } = usuario;
    return safeUser;
  }


}