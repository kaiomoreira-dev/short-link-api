import { Module } from '@nestjs/common'
import { DatabaseModule } from '@/infra/database/database.module'
import { CreateShortLinkController } from '@/infra/http/controllers/links/create-link.controller'
import { CreateShortLinkUseCase } from '@/domain/short-link/usecases/links/create-short-link'
import { RedirectToLinkUseCase } from '@/domain/short-link/usecases/links/redirect-to-link'
import { RedirectToLinkController } from '@/infra/http/controllers/links/redirect-to-link.controller'
import { AutheticateController } from '@/infra/http/controllers/auth/authenticate.controller'
import { AuthenticateUserUsecase } from '@/domain/short-link/usecases/auth/authenticate-user-usecase'
import { CryptographyModule } from '@/infra/cryptography/cryptography.module'
import { RegisterUserController } from '@/infra/http/controllers/users/register-user.controller'
import { RegisterUserUsecase } from '@/domain/short-link/usecases/users/register-user-usecase'
import { FetchLinkController } from './controllers/links/fetch-links.controller'
import { FetchLinkUseCase } from '@/domain/short-link/usecases/links/fetch-link'
import { DeleteShortLinkController } from './controllers/links/delete-link.controller'
import { DeleteShortLinkUseCase } from '@/domain/short-link/usecases/links/delete-link'

@Module({
  imports: [DatabaseModule, CryptographyModule],
  controllers: [
    CreateShortLinkController,
    FetchLinkController,
    RedirectToLinkController,
    DeleteShortLinkController,
    AutheticateController,
    RegisterUserController,
  ],
  providers: [
    CreateShortLinkUseCase,
    FetchLinkUseCase,
    RedirectToLinkUseCase,
    AuthenticateUserUsecase,
    RegisterUserUsecase,
    DeleteShortLinkUseCase,
  ],
})
export class HttpModule {}
