import { InMemoryLinksRepository } from 'test/repositories/in-memory-links-repository'
import { RedirectToLinkUseCase } from './redirect-to-link'
import { CreateShortLinkUseCase } from './create-short-link'

let inMemoryLinksRepository: InMemoryLinksRepository
let stu: RedirectToLinkUseCase
let createShortLinkUseCase: CreateShortLinkUseCase

describe('Redirect To Link', () => {
  beforeEach(() => {
    inMemoryLinksRepository = new InMemoryLinksRepository()
    createShortLinkUseCase = new CreateShortLinkUseCase(inMemoryLinksRepository)
    stu = new RedirectToLinkUseCase(inMemoryLinksRepository)
  })

  it('should be redirect to link by short code', async () => {
    const result = await createShortLinkUseCase.execute({
      originalUrl: 'https://teddy360.com.br/',
      userId: 'c71ec6ec-b22b-44ec-8f22-3ad3f7e3c43d',
    })

    if (result.isRight()) {
      await inMemoryLinksRepository.create(result.value.link)

      const resultRedirect = await stu.execute({
        shortCode: result.value.link.shortUrl.value.split('/')[3],
      })

      expect(resultRedirect.isRight()).toBeTruthy()
      if (resultRedirect.isRight()) {
        expect(resultRedirect.value.link.originalUrl).toEqual(
          'https://teddy360.com.br/',
        )
        expect(resultRedirect.value.link.clicks).not.toEqual(0)
      }
    }
  })

  it('should be count clicks when redirect to link', async () => {
    const result = await createShortLinkUseCase.execute({
      originalUrl: 'https://teddy360.com.br/',
    })

    if (result.isRight()) {
      const resultFindLink = await stu.execute({
        shortCode: result.value.link.shortUrl.value.split('/')[3],
      })

      expect(resultFindLink.isRight()).toBeTruthy()
      if (resultFindLink.isRight()) {
        expect(resultFindLink.value.link.clicks).not.toEqual(0)
      }
    }
  })
})
