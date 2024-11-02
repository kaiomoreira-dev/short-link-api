import { Either, left, right } from '@/core/types/either'
import { LinksRepository } from '@/domain/short-link/application/repositories/links-repository'
import { Link } from '@/domain/short-link/enterprise/entities/link'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'

interface GetToShortCodeRequest {
  shortCode: string
}

export type GetToShortCodeResponse = Either<
  ResourceNotFoundError,
  { link: Link }
>

export class GetToShortCodeUseCase {
  constructor(private linksRepository: LinksRepository) {}

  async execute({
    shortCode,
  }: GetToShortCodeRequest): Promise<GetToShortCodeResponse> {
    // verificar se o link existe
    const link = await this.linksRepository.findByShortCode(shortCode)

    // verificar se o link existe
    if (!link) {
      return left(new ResourceNotFoundError())
    }

    return right({ link })
  }
}
