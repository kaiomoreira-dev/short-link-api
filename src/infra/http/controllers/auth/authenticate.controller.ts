import { AuthenticateUserUsecase } from '@/domain/short-link/usecases/auth/authenticate-user-usecase'
import {
  BadRequestException,
  Body,
  Controller,
  Post,
  UnauthorizedException,
  UseGuards,
  UsePipes,
} from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { z } from 'zod'
import { ZodValidationPipe } from '../../pipes/zod-validation-pipe'
import { WrongCredentialsError } from '@/domain/short-link/usecases/errors/wrong-credentials-erros'
import { Public } from '@/infra/auth/public'

const authenticateBodySchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
})

type AuthenticateBody = z.infer<typeof authenticateBodySchema>

@Controller('/sessions')
@Public()
export class AutheticateController {
  constructor(private authenticateUseCase: AuthenticateUserUsecase) {}

  @Post()
  @UsePipes(new ZodValidationPipe(authenticateBodySchema))
  async create(@Body() body: AuthenticateBody) {
    const { email, password } = body

    const result = await this.authenticateUseCase.execute({
      email,
      password,
    })

    if (result.isLeft()) {
      const error = result.value

      switch (error.constructor) {
        case WrongCredentialsError:
          throw new UnauthorizedException(error.message)

        default:
          throw new BadRequestException(error.message)
      }
    }

    if (result.isRight()) {
      const { accessToken } = result.value

      return { accessToken }
    }
  }
}
