import { Either, left, right } from '@/core/types/either'
import { LinksRepository } from '../../application/repositories/links-repository'
import { Link } from '../../enterprise/entities/link'
import { ResourceNotFoundError } from '../../../../core/errors/errors/resource-not-found-error'

interface FetchLinkRequest {
  page: number
  userId: string
}

export type FetchLinksResponse = Either<
  ResourceNotFoundError,
  { links: Link[] }
>

export class FetchLinkUseCase {
  constructor(private linkRepository: LinksRepository) {}

  async execute({
    page,
    userId,
  }: FetchLinkRequest): Promise<FetchLinksResponse> {
    const findManyLinks = await this.linkRepository.findManyByUserId(userId, {
      page,
    })

    // validar se existe ums lista de links
    if (!findManyLinks) {
      return left(new ResourceNotFoundError())
    }

    return right({ links: findManyLinks })
  }
}
