import {HttpResponse} from "../web/IHttpResponse";

export const badRequest = (error: Error): HttpResponse => ({
  statusCode: 400,
  body: error
})
