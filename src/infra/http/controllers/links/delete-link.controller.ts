import {
  BadRequestException,
  Controller,
  Delete,
  HttpCode,
  Param,
} from '@nestjs/common'
import { DeleteShortLinkUseCase } from '@/domain/short-link/usecases/links/delete-link'

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
      throw new BadRequestException()
    }
  }
}
