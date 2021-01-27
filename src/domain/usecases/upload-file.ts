export interface UploadFile {
    upload(file: string): Promise<string>
}
