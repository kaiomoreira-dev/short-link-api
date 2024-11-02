import { Either, left, right } from '@/core/types/either'
import { LinksRepository } from '../../application/repositories/links-repository'
import { ResourceNotFoundError } from '../../../../core/errors/errors/resource-not-found-error'

interface ShortLinkRequest {
  linkId: string
}

type DeleteShortLinkResponse = Either<ResourceNotFoundError, {}>

export class DeleteShortLinkUseCase {
  constructor(private linkRepository: LinksRepository) {}

  async execute({
    linkId,
  }: ShortLinkRequest): Promise<DeleteShortLinkResponse> {
    // buscar link pelo id
    const findLink = await this.linkRepository.findById(linkId)

    // validar se o link existe
    if (!findLink) {
      return left(new ResourceNotFoundError())
    }

    // deletar o link
    await this.linkRepository.delete(findLink)

    return right({})
  }
}
