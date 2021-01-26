export interface UploadFile {
    upload(file: any): Promise<string>
}
