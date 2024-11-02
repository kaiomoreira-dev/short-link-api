import { Either, left, right } from '@/core/types/either'
import { LinksRepository } from '../../application/repositories/links-repository'
import { ResourceNotFoundError } from '../../../../core/errors/errors/resource-not-found-error'
import { Link } from '../../enterprise/entities/link'
import { Injectable } from '@nestjs/common'

interface RedirectToLinkRequest {
  shortCode: string
}

export type RedirectToLinkResponse = Either<
  ResourceNotFoundError,
  { link: Link }
>

@Injectable()
export class RedirectToLinkUseCase {
  constructor(private linksRepository: LinksRepository) {}

  async execute({
    shortCode,
  }: RedirectToLinkRequest): Promise<RedirectToLinkResponse> {
    const shortUrl = `http://localhost:3333/${shortCode}` // colocar env da url da aplicação

    // verificar se o link existe
    const user = await this.linksRepository.findByShortCode(shortUrl)

    // verificar se o link existe
    if (!user) {
      return left(new ResourceNotFoundError())
    }

    // contabilizar o acesso ao link
    user.countClick()

    // atualizar o contador de acessos no repositório
    await this.linksRepository.save(user)

    return right({ link: user })
  }
}
