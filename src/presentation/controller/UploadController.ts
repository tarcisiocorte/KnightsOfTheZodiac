import { badRequest, HttpRequest, HttpResponse, ok } from '../web'

export class UploadController {
  handle (httpRequest: HttpRequest): HttpResponse {
    if (!httpRequest.body.companyKey) {
      return badRequest(new Error('companyKey'))
    }
    if (!httpRequest.body.image) {
      return badRequest(new Error('image'))
    }

    if (!httpRequest.body.userKey) {
      return badRequest(new Error('userKey'))
    }

    if (!httpRequest.body.image.includes('.jpg', '.png')) {
      return badRequest(new Error('The image has not the correct format'))
    }

    return ok(httpRequest.body)
  }
}
