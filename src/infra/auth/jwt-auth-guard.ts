import { ExecutionContext, Injectable, CanActivate } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { AuthGuard } from '@nestjs/passport'
import { IS_PUBLIC_KEY } from './public'

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super()
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ])

    // Se a rota é pública, não obrigamos o token, mas ainda tentamos validar se ele existir
    if (isPublic) {
      const request = context.switchToHttp().getRequest()
      const token = request.headers.authorization?.split(' ')[1]

      // Se o token existir, usamos o guard padrão para tentar validá-lo
      if (token) {
        return super.canActivate(context) as Promise<boolean>
      }

      // Permitir o acesso sem autenticação se não houver token
      return true
    }

    // Rota privada: token é obrigatório
    return super.canActivate(context) as Promise<boolean>
  }
}
