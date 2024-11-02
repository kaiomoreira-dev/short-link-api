import { InMemoryLinksRepository } from 'test/repositories/in-memory-links-repository'
import { CreateShortLinkUseCase } from './create-short-link'
import { faker } from '@faker-js/faker'
import { EditShortLinkUseCase } from './edit-link'

let inMemoryLinksRepository: InMemoryLinksRepository
let stu: EditShortLinkUseCase
let createShortLinkUseCase: CreateShortLinkUseCase

describe('Edit Short Link', () => {
  beforeEach(() => {
    inMemoryLinksRepository = new InMemoryLinksRepository()
    createShortLinkUseCase = new CreateShortLinkUseCase(inMemoryLinksRepository)
    stu = new EditShortLinkUseCase(inMemoryLinksRepository)
  })

  it('should be able to edit a short link', async () => {
    const result = await createShortLinkUseCase.execute({
      originalUrl: 'https://teddy360.com.br/',
      userId: faker.string.uuid(),
    })

    if (result.isRight()) {
      await inMemoryLinksRepository.create(result.value.link)

      const resultUpdated = await stu.execute({
        linkId: result.value.link.id,
        newOriginalUrl: 'https://teddy360.com.br/updated',
      })

      expect(resultUpdated.isRight()).toBeTruthy()
      if (resultUpdated.isRight()) {
        expect(resultUpdated.isRight()).toBeTruthy()
        expect(resultUpdated.value.link.originalUrl).toEqual(
          'https://teddy360.com.br/updated',
        )
        expect(resultUpdated.value.link.updatedAt).not.toBeNull()
      }
    }
  })
})
