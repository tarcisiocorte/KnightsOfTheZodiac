import { HttpRequest } from '../web/IHttpRequest'
import { HttpResponse } from '../web/IHttpResponse'

export class UploadController {
  handle (httpRequest: HttpRequest): HttpResponse {
    if (!httpRequest.body.companyKey) {
      return {
        statusCode: 400,
        body: new Error('companyKey')
      }
    }
    if (!httpRequest.body.image) {
      return {
        statusCode: 400,
        body: new Error('image')
      }
    }

    if (!httpRequest.body.userKey) {
      return {
        statusCode: 400,
        body: new Error('userKey')
      }
    }

    if (!httpRequest.body.image.includes('.jpg', '.png')) {
      return {
        statusCode: 400,
        body: new Error('The image has not the correct format')
      }
    }

    return {
      statusCode: 200,
      body: httpRequest.body
    }
  }
}
