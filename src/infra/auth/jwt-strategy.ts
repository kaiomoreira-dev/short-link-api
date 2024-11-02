import { ExtractJwt, Strategy } from 'passport-jwt'
import { PassportStrategy } from '@nestjs/passport'
import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { Env } from '@/infra/env'
import { z } from 'zod'

const tokenpayloadSchema = z.object({
  sub: z.string().uuid(),
})

export type UserPayload = z.infer<typeof tokenpayloadSchema>

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private configService: ConfigService<Env, true>) {
    const publicKey = configService.get('JWT_PUBLIC_KEY', { infer: true })

    // configurando o PassportStrategy com a publicKey para acessar os dados nas rotas
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: Buffer.from(publicKey, 'base64'),
      algorithms: ['RS256'],
    })
  }

  // Méthodo responsavel por validar o dados dentro do token
  async validate(payload: UserPayload) {
    // pegando o schema criado no zod para validar se o payload tem a mesma tipagem
    return tokenpayloadSchema.parse(payload)
  }
}
