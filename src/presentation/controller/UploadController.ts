export class UploadController {
  handle (httpRequest: any): any {
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
  }
}
