import {
  BadRequestException,
  Controller,
  Delete,
  HttpCode,
  Param,
} from '@nestjs/common'
import { DeleteShortLinkUseCase } from '@/domain/short-link/usecases/links/delete-link'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'

@Controller('/links/:id')
export class DeleteShortLinkController {
  constructor(private deleteLinkUseCase: DeleteShortLinkUseCase) {}

  @Delete()
  @HttpCode(204)
  async handle(@Param('id') linkId: string) {
    const result = await this.deleteLinkUseCase.execute({
      linkId,
    })

    if (result.isLeft()) {
      const error = result.value

      switch (error.constructor) {
        case ResourceNotFoundError:
          throw new BadRequestException(error.message)

        default:
          throw new BadRequestException(error.message)
      }
    }
  }
}
