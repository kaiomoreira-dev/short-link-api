import {
  BadRequestException,
  Body,
  Controller,
  Param,
  Patch,
  Post,
} from '@nestjs/common'
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe'
import { z } from 'zod'
import { HttpLinksPresenter } from '@/infra/http/presenters/http-links-presenter'
import { CurrentUser } from '@/infra/auth/current-user-decorator'
import { UserPayload } from '@/infra/auth/jwt-strategy'
import { Public } from '@/infra/auth/public'
import { EditShortLinkUseCase } from '@/domain/short-link/usecases/links/edit-link'

const editLinkSchema = z.object({
  newOriginalUrl: z.string().url().min(1),
})

const bodyValidationPipe = new ZodValidationPipe(editLinkSchema)

type EditLinkSchema = z.infer<typeof editLinkSchema>

@Controller('/links/:id')
export class EditShortLinkController {
  constructor(private editLinkUseCase: EditShortLinkUseCase) {}

  @Patch()
  async handle(
    @Param('id') linkId: string,
    @Body(bodyValidationPipe) body: EditLinkSchema,
  ) {
    const { newOriginalUrl } = body

    const result = await this.editLinkUseCase.execute({
      newOriginalUrl,
      linkId,
    })

    if (result.isRight()) {
      const editdLink = result.value.link

      return HttpLinksPresenter.toHttp(editdLink)
    }

    // tratativa de erro para caso for um erro 500
    if (result.isLeft()) {
      throw new BadRequestException()
    }
  }
}
