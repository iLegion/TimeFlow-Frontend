import { httpCall } from '@/shared/api/httpCall'
import type {
  UserInterface,
  UserUpdateEmailPayloadInterface,
  UserUpdatePasswordPayloadInterface,
  UserUpdatePayloadInterface
} from '@/interfaces/user/user.interface.ts'

const useUserApi = () => {
  const me = () => {
    return httpCall<UserInterface>({ method: 'get', url: '/users/me' })
  }

  const update = (data: UserUpdatePayloadInterface) => {
    return httpCall<UserInterface>({ method: 'post', url: '/users/me', data })
  }

  const updateEmail = (data: UserUpdateEmailPayloadInterface) => {
    return httpCall<UserInterface>({ method: 'post', url: '/users/me/email', data })
  }

  const updatePassword = (data: UserUpdatePasswordPayloadInterface) => {
    return httpCall<UserInterface>({ method: 'post', url: '/users/me/password', data })
  }

  return { me, update, updateEmail, updatePassword }
}

export default useUserApi;
