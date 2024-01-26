export type SignUpReqDto = {
  phone_number: number,
  email_address: string,
  password: string,
  fullname: string,
  role: string
}

export type SignUpResDto = {
  access_token: string,
  expires_in: number,
  roles: string[]
}