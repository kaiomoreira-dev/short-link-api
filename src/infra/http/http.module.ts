import { Module } from '@nestjs/common'
import { DatabaseModule } from '@/infra/database/database.module'
import { CreateShortLinkController } from './controllers/links/create-link.controller'
import { CreateShortLinkUseCase } from '@/domain/short-link/usecases/links/create-short-link'
import { RedirectToLinkUseCase } from '@/domain/short-link/usecases/links/redirect-to-link'
import { RedirectToLinkController } from '@/infra/http/controllers/links/redirect-to-link.controller'
import { AutheticateController } from '@/infra/http/controllers/auth/authenticate.controller'
import { AuthenticateUserUsecase } from '@/domain/short-link/usecases/auth/authenticate-user-usecase'
import { CryptographyModule } from '@/infra/cryptography/cryptography.module'
import { RegisterUserController } from './controllers/users/register-user.controller'
import { RegisterUserUsecase } from '@/domain/short-link/usecases/users/register-user-usecase'

@Module({
  imports: [DatabaseModule, CryptographyModule],
  controllers: [
    CreateShortLinkController,
    RedirectToLinkController,
    AutheticateController,
    RegisterUserController,
  ],
  providers: [
    CreateShortLinkUseCase,
    RedirectToLinkUseCase,
    AuthenticateUserUsecase,
    RegisterUserUsecase,
  ],
})
export class HttpModule {}
