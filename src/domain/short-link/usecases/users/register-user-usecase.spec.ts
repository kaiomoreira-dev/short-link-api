import { InMemoryUsersRepository } from 'test/repositories/in-memory-users-repository'
import { RegisterUserUsecase } from './register-user-usecase'
import { faker } from '@faker-js/faker'
import { FakerHasher } from 'test/cryptography/faker-hasher'

let inMemoryUserRepository: InMemoryUsersRepository
let fakerHash: FakerHasher
let stu: RegisterUserUsecase

describe('Register User', () => {
  beforeEach(() => {
    inMemoryUserRepository = new InMemoryUsersRepository()
    fakerHash = new FakerHasher()
    stu = new RegisterUserUsecase(inMemoryUserRepository, fakerHash)
  })

  it('should be able to register a new user', async () => {
    const result = await stu.execute({
      email: 'joe@me.com',
      name: faker.person.fullName(),
      password: faker.internet.password(),
    })

    if (result.isRight()) {
      await inMemoryUserRepository.create(result.value.user)

      expect(result.isRight()).toBeTruthy()
      expect(result.value).toEqual({
        user: result.value.user,
      })
    }
  })

  it('should be able to register user with password hash', async () => {
    const result = await stu.execute({
      email: 'joeKlin@me.com',
      name: faker.person.fullName(),
      password: '159753',
    })

    const hashedPassword = await fakerHash.generate('159753')

    if (result.isRight()) {
      expect(result.isRight()).toBeTruthy()
      expect(inMemoryUserRepository.items[0].password).toEqual(hashedPassword)
    }
  })
})
