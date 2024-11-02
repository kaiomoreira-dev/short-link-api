import { User } from '@/domain/short-link/enterprise/entities/user'

export class HttpUsersPresenter {
  static toHttp(user: User) {
    return {
      id: user.id.toString(),
      name: user.name,
      email: user.email,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      deletedAt: user.deletedAt,
    }
  }
}
