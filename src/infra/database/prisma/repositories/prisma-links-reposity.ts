import { PaginationParams } from '@/core/repositories/pagination-params'
import { LinksRepository } from '@/domain/short-link/application/repositories/links-repository'
import { Link } from '@/domain/short-link/enterprise/entities/link'
import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma.service'
import { PrismaLinkMapper } from '../mappers/prisma-links-mapper'

@Injectable()
export class PrismaLinksRepository implements LinksRepository {
  constructor(private prisma: PrismaService) {}
  async findById(id: string): Promise<Link | null> {
    const link = await this.prisma.link.findUnique({
      where: {
        id,
      },
    })

    if (!link) {
      return null
    }

    return PrismaLinkMapper.toDomain(link)
  }

  async findByShortCode(shortUrl: string): Promise<Link | null> {
    const link = await this.prisma.link.findUnique({
      where: {
        shortUrl,
      },
    })

    if (!link) {
      return null
    }

    return PrismaLinkMapper.toDomain(link)
  }

  async findManyByUserId(
    userId: string,
    params: PaginationParams,
  ): Promise<Link[]> {
    const links = await this.prisma.link.findMany({
      where: {
        userId,
        deletedAt: null,
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: 20,
      skip: (params.page - 1) * params.page,
    })

    return links.map(PrismaLinkMapper.toDomain)
  }

  async create(link: Link): Promise<Link> {
    const data = PrismaLinkMapper.toPrisma(link)

    const createLink = await this.prisma.link.create({
      data,
    })

    return PrismaLinkMapper.toDomain(createLink)
  }

  async save(link: Link): Promise<Link> {
    const data = PrismaLinkMapper.toPrisma(link)

    const createLink = await this.prisma.link.update({
      where: {
        id: data.id,
      },
      data,
    })

    return PrismaLinkMapper.toDomain(createLink)
  }
}
