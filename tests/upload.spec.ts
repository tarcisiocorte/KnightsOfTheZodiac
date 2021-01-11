import { UploadController } from '../src/presentation/controller/UploadController'

describe('Upload Controller', () => {
  test('should return 400 if no image is provided', () => {
    const sut = new UploadController()
    const httpRequest = {
      body: {
        companyKey: 'a_company_key',
        userKey: 'an_user_key'
      }
    }
    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new Error('image'))
  })

  test('should return 400 if no companyKey is provided', () => {
    const sut = new UploadController()
    const httpRequest = {
      body: {
        userKey: 'an_user_key',
        image: 'any_image'
      }
    }
    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new Error('companyKey'))
  })

  test('should return 400 if no userKey is provided', () => {
    const sut = new UploadController()
    const httpRequest = {
      body: {
        companyKey: 'a_company_key',
        image: 'any_image'
      }
    }
    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new Error('userKey'))
  })

  test('should return 400 if the image is not .JPG or .PNG', () => {
    const sut = new UploadController()
    const httpRequest = {
      body:{
        companyKey: 'any_company_key',
        userKey: 'any_user',
        image: 'image.bmp'
      }      
    }
    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new Error('The image has not the correct format'))
  })
})
