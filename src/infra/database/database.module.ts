import { LinksRepository } from '@/domain/short-link/application/repositories/links-repository'
import { Module } from '@nestjs/common'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { PrismaLinksRepository } from '@/infra/database/prisma/repositories/prisma-links-reposity'
import { UsersRepository } from '@/domain/short-link/application/repositories/users-repository'
import { PrismaUsersRepository } from './prisma/repositories/prisma-users-repository'
import { CacheModule } from '../cache/cache.module'

@Module({
  imports: [CacheModule],
  providers: [
    PrismaService,
    {
      provide: LinksRepository,
      useClass: PrismaLinksRepository,
    },
    {
      provide: UsersRepository,
      useClass: PrismaUsersRepository,
    },
  ],
  exports: [PrismaService, LinksRepository, UsersRepository],
})
export class DatabaseModule {}
