import {HttpRequest} from '../web/IHttpRequest'
import {HttpResponse} from '../web/IHttpResponse'

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
  }
}
