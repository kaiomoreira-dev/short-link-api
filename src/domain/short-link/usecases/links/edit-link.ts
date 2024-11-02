import { Either, left, right } from '@/core/types/either'
import { LinksRepository } from '../../application/repositories/links-repository'
import { Link } from '../../enterprise/entities/link'
import { ResourceNotFoundError } from '../../../../core/errors/errors/resource-not-found-error'

interface EditLinkRequest {
  linkId: string
  newOriginalUrl: string
}

export type EditShortLinkResponse = Either<
  ResourceNotFoundError,
  { link: Link }
>
export class EditShortLinkUseCase {
  constructor(private linkRepository: LinksRepository) {}

  async execute({
    linkId,
    newOriginalUrl,
  }: EditLinkRequest): Promise<EditShortLinkResponse> {
    // validar se o link existe pelo id
    const findLink = await this.linkRepository.findById(linkId)

    // validar se o link existe
    if (!findLink) {
      return left(new ResourceNotFoundError())
    }

    // editar o link
    findLink.originalUrl = newOriginalUrl

    const updatedLink = await this.linkRepository.save(findLink)

    return right({ link: updatedLink })
  }
}
