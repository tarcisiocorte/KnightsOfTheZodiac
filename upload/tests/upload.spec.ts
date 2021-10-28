import { UploadController } from '../src/presentation/controller/UploadController'
import { PhotoDataModel } from './domain/models/photodatamodel'
import { AddUploadFileModel } from './domain/models/adduploadfilemodel'

import { AddPhotoData, AddPhotoDataModel } from './domain/usecases/add-photodata'
import { UploadFile } from './domain/usecases/upload-file'

const makeAddPhotoData = (): AddPhotoData => {
  class AddPhotoDataStub implements AddPhotoData {
    async add(photoData: AddPhotoDataModel): Promise<PhotoDataModel> {
      const fakePhotoData = {
        id: 'valid_id',
        companyKey: 'any_company_key',
        userKey: 'an_user_key',
        image: 'image.jpg'
      }
      return new Promise(resolve => resolve(fakePhotoData))
    }
  }
  return new AddPhotoDataStub()
}

const makeUploadFile = (): UploadFile => {
  class UploadFileStub implements UploadFile {
    async upload(file: AddUploadFileModel): Promise<string> {
      const fakeFileName = 'image.jpg'
      return new Promise(resolve => resolve(fakeFileName))
    }
  }
  return new UploadFileStub()
}

interface CreateSutTypes {
  sut: UploadController
  addPhotoDataStub: AddPhotoData
  uploadFileStub: UploadFile
}

const createSut = (): CreateSutTypes => {
  const addPhotoDataStub = makeAddPhotoData()
  const uploadFileStub = makeUploadFile()
  const sut = new UploadController(addPhotoDataStub, uploadFileStub)
  return {
    sut,
    addPhotoDataStub,
    uploadFileStub
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

  test('should return 400 if the image is not .JPG or .jpg', async () => {
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
  test('should calls UploadFile when valid data is provided', async () => {
    const { sut, uploadFileStub } = createSut()
    const upload = jest.spyOn(uploadFileStub, 'upload')
    const httpRequest = {
      body: {
        companyKey: 'any_company_key',
        userKey: 'any_user',
        image: 'image.jpg'
      }
    }
    await sut.handle(httpRequest)
    expect(upload).toHaveBeenCalledWith(expect.anything())
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
  test('should call UploadFile when valid data is provided', async () => {
    const { sut, uploadFileStub } = createSut()
    const upload = jest.spyOn(uploadFileStub, 'upload')
    const httpRequest = {
      body: {
        companyKey: 'any_company_key',
        userKey: 'any_user',
        image: 'image.jpg'
      }
    }
    await sut.handle(httpRequest)
    expect(upload).toHaveBeenCalledWith(expect.anything())
  })
  test('Should return 500 if AddPhotoData throws', async () => {
    const { sut, addPhotoDataStub } = createSut()
    jest.spyOn(addPhotoDataStub, 'add').mockImplementationOnce(async () => {
      return new Promise((resolve, reject) => reject(new Error()))
    })
    const httpRequest = {
      body: {
        companyKey: 'any_company_key',
        userKey: 'any_user',
        image: 'image.jpg'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.body).toEqual(new Error())
  })
})
