import { PaginationParams } from '@/core/repositories/pagination-params'
import { Link } from '@/domain/short-link/enterprise/entities/link'

export abstract class LinksRepository {
  abstract findById(id: string): Promise<Link | null>

  abstract findByShortCode(shortUrl: string): Promise<Link | null>

  abstract findManyByUserId(
    userId: string,
    params: PaginationParams,
  ): Promise<Link[]>

  abstract create(link: Link): Promise<Link>
  abstract delete(link: Link): Promise<void>
  abstract save(link: Link): Promise<Link>
}
