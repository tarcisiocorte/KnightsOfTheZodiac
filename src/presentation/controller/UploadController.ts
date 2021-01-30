import { AddPhotoData } from '@/domain/usecases/add-photodata'
import { UploadFile } from '@/domain/usecases/upload-file'
import { badRequest, HttpRequest, HttpResponse, ok } from '../web'
import { v4 as uuid } from 'uuid'

export class UploadController {
  private readonly addPhotoData: AddPhotoData
  private readonly uploadFile: UploadFile
  constructor(addPhotoData: AddPhotoData, uploadFile: UploadFile) {
    this.addPhotoData = addPhotoData
    this.uploadFile = uploadFile
  }

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    if (!httpRequest.body.companyKey) {
      return badRequest(new Error('companyKey'))
    }
    if (!httpRequest.body.image) {
      return badRequest(new Error('image'))
    }

    if (!httpRequest.body.userKey) {
      return badRequest(new Error('userKey'))
    }

    const { companyKey, userKey, image } = httpRequest.body
    if (!httpRequest.body.image.includes('.jpg', '.jpg')) {
      return badRequest(new Error('The image has not the correct format'))
    }

    const hashName = await uuid()
    this.uploadFile.upload({ hashName, image })
    const photoData = await this.addPhotoData.add({ companyKey, userKey, image })
    return ok(photoData)
  }
}
