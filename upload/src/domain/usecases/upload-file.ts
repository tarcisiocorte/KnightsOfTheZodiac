import { AddUploadFileModel } from '../models/adduploadfilemodel'

export interface UploadFile {
  upload: (file: AddUploadFileModel) => Promise<string>
}
