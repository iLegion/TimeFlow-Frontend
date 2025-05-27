export interface RegisterPayloadInterface {
  name: string
  email: string
  password: string
  password_confirmation: string
}

export interface LoginPayloadInterface {
  email: string
  password: string
}
