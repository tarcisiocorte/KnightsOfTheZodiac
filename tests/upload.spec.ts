import { UploadController } from '../src/presentation/controller/UploadController'

describe('Description', () => {
  test('should return 400 if no image is provided', () => {
    const sut = new UploadController()
    const httpRequest = {
      body: {
        companyKey: 'a_company_key',
        userKey: 'an_use_key'
      }
    }
    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
  })
})
