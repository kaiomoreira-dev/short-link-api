import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Link } from '@/domain/short-link/enterprise/entities/link'
import { ShortUrl } from '@/domain/short-link/enterprise/entities/value-objects/short-code-link'
import { Prisma, Link as PrismaLink } from '@prisma/client'

export class PrismaLinkMapper {
  static toDomain(raw: PrismaLink): Link {
    return Link.create(
      {
        originalUrl: raw.originalUrl,
        shortUrl: ShortUrl.create(raw.shortUrl),
        clicks: Number(raw.clicks),
        userId: raw.userId ? new UniqueEntityId(raw.userId) : null,
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
        deletedAt: raw.deletedAt,
      },
      new UniqueEntityId(raw.id),
    )
  }

  static toPrisma(link: Link): Prisma.LinkUncheckedCreateInput {
    return {
      id: link.id.toString(),
      originalUrl: link.originalUrl,
      shortUrl: link.shortUrl.value,
      clicks: link.clicks,
      userId: link.userId?.toString(),
      createdAt: link.createdAt,
      updatedAt: link.updatedAt,
      deletedAt: link.deletedAt,
    }
  }
}
