import {
  BadRequestException,
  NotFoundException,
  Controller,
  Get,
  Param,
  Redirect,
  UseGuards,
} from '@nestjs/common'
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe'
import { z } from 'zod'
import { RedirectToLinkUseCase } from '@/domain/short-link/usecases/links/redirect-to-link'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'

// Esquema de validação para o `shortCode`
const shortCodeQueryParamSchema = z.string().min(1)

const paramRedirectValidationPipe = new ZodValidationPipe(
  shortCodeQueryParamSchema,
)

type ShortCodeParam = z.infer<typeof shortCodeQueryParamSchema>

@Controller('/:shortCode')
export class RedirectToLinkController {
  constructor(private redirectToLinkUseCase: RedirectToLinkUseCase) {}

  @Get()
  @Redirect()
  async handle(
    @Param('shortCode', paramRedirectValidationPipe) shortCode: ShortCodeParam, // Corrigido para 'shortCode'
  ) {
    const result = await this.redirectToLinkUseCase.execute({ shortCode })

    // tratativa de erro para quando nao encontrar o link
    // e para caso for um erro 500
    if (result.isLeft()) {
      const error = result.value

      switch (error.constructor) {
        case ResourceNotFoundError:
          throw new NotFoundException(error.message)

        default:
          throw new BadRequestException(error.message)
      }
    }

    if (result.isRight()) {
      const originalUrl = result.value.link.originalUrl

      return { url: originalUrl, statusCode: 302 }
    }
  }
}
