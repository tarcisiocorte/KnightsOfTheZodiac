import { UploadController } from '../src/presentation/controller/UploadController'
import { PhotoDataModel } from './domain/models/photodatamodel'
import { AddPhotoData, AddPhotoDataModel } from './domain/usecases/add-photodata'

const makeAddPhotoData = (): AddPhotoData => {
  class AddPhotoDataStub implements AddPhotoData {
    async add(photoData: AddPhotoDataModel): Promise<PhotoDataModel> {
      const fakePhotoData = {
        id: 'valid_id',
        companyKey: 'any_company_key',
        userKey: 'an_user_key',
        image: 'image.png'
      }
      return new Promise(resolve => resolve(fakePhotoData))
    }
  }
  return new AddPhotoDataStub()
}

interface CreateSutTypes {
  sut: UploadController
  addPhotoDataStub: AddPhotoData
}

const createSut = (): CreateSutTypes => {
  const addPhotoDataStub = makeAddPhotoData()
  const sut = new UploadController(addPhotoDataStub)
  return {
    sut,
    addPhotoDataStub
  }
}

describe('Upload Controller', () => {
  test('should return 400 if no image is provided', async () => {
    const { sut } = createSut()
    const httpRequest = {
      body: {
        companyKey: 'a_company_key',
        userKey: 'an_user_key'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new Error('image'))
  })

  test('should return 400 if no companyKey is provided', async () => {
    const { sut } = createSut()
    const httpRequest = {
      body: {
        userKey: 'an_user_key',
        image: 'any_image'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new Error('companyKey'))
  })

  test('should return 400 if no userKey is provided', async () => {
    const { sut } = createSut()
    const httpRequest = {
      body: {
        companyKey: 'a_company_key',
        image: 'any_image'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new Error('userKey'))
  })

  test('should return 400 if the image is not .JPG or .PNG', async () => {
    const { sut } = createSut()
    const httpRequest = {
      body: {
        companyKey: 'any_company_key',
        userKey: 'any_user',
        image: 'image.bmp'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new Error('The image has not the correct format'))
  })
  test('should return statusCode 200 and save data if valid data is fully provided', async () => {
    const { sut, addPhotoDataStub } = createSut()
    const photoData = jest.spyOn(addPhotoDataStub, 'add')
    const httpRequest = {
      body: {
        companyKey: 'any_company_key',
        userKey: 'any_user',
        image: 'image.jpg'
      }
    }
    var httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(200)
    expect(photoData).toHaveBeenCalledWith({
      companyKey: 'any_company_key',
      userKey: 'any_user',
      image: 'image.jpg'
    })
  })
})
