import { InMemoryLinksRepository } from 'test/repositories/in-memory-links-repository'
import { CreateShortLinkUseCase } from './create-short-link'
import { GetToShortCodeUseCase } from './get-by-short-code-usecase'

let inMemoryLinksRepository: InMemoryLinksRepository
let stu: GetToShortCodeUseCase
let createShortLinkUseCase: CreateShortLinkUseCase

describe('Get Short Code', () => {
  beforeEach(() => {
    inMemoryLinksRepository = new InMemoryLinksRepository()
    createShortLinkUseCase = new CreateShortLinkUseCase(inMemoryLinksRepository)
    stu = new GetToShortCodeUseCase(inMemoryLinksRepository)
  })

  it('should be find link by shprt code', async () => {
    const result = await createShortLinkUseCase.execute({
      originalUrl: 'https://teddy360.com.br/',
      userId: 'c71ec6ec-b22b-44ec-8f22-3ad3f7e3c43d',
    })

    if (result.isRight()) {
      await inMemoryLinksRepository.create(result.value.link)

      const resultFindLink = await stu.execute({
        shortCode: result.value.link.shortUrl.value,
      })

      expect(resultFindLink.isRight()).toBeTruthy()
      if (resultFindLink.isRight()) {
        expect(resultFindLink.value.link.originalUrl).toEqual(
          'https://teddy360.com.br/',
        )
      }
    }
  })
})
