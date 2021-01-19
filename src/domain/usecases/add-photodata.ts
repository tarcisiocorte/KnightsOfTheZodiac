import { PhotoDataModel } from '../models/photodatamodel'

export interface AddPhotoDataModel {
  companyKey: string
  userKey: string
  image: string
}

export interface AddPhotoData {
  add (photoData: AddPhotoDataModel): Promise<PhotoDataModel>
}
