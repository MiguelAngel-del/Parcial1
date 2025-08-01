import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    // Intenta autenticar
    const result = (await super.canActivate(context)) as boolean;
    
    // Si la autenticación es exitosa, inicia sesión
    const request = context.switchToHttp().getRequest();
    await super.logIn(request);
    
    return result;
  }
}