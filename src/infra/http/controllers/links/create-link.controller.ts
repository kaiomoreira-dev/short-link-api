import {
  BadRequestException,
  Body,
  Controller,
  Post,
  UseGuards,
} from '@nestjs/common'
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe'
import { z } from 'zod'
import { CreateShortLinkUseCase } from '@/domain/short-link/usecases/links/create-short-link'
import { HttpLinksPresenter } from '../../presenters/http-links-presenter'

const createLinkSchema = z.object({
  originalUrl: z.string().url().min(1),
})

const bodyValidationPipe = new ZodValidationPipe(createLinkSchema)

type CreateLinkSchema = z.infer<typeof createLinkSchema>

@Controller('/links')
export class CreateShortLinkController {
  constructor(private createLinkUseCase: CreateShortLinkUseCase) {}

  @Post()
  async handle(@Body(bodyValidationPipe) body: CreateLinkSchema) {
    const { originalUrl } = body

    const result = await this.createLinkUseCase.execute({
      originalUrl,
    })

    if (result.isRight()) {
      const createdLink = result.value.link

      return HttpLinksPresenter.toHttp(createdLink)
    }

    if (result.isLeft()) {
      throw new BadRequestException()
    }
  }
}
