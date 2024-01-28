export type UserResDto = {
  phone_number: number,
  email_address: string,
  fullname: string,
  roles: string[]
}

export type UserDocumentsResDto = {
  id: string,
  description: string,
  role: string,
  types: string[],
  required: boolean,
}