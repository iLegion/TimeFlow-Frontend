export interface UserInterface {
  id: number
  name: string
  email: string
}

export interface UserUpdatePayloadInterface {
  name: string
}

export interface UserUpdateEmailPayloadInterface {
  email: string
}

export interface UserUpdatePasswordPayloadInterface {
  password: string
  password_confirmation: string
}
