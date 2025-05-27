import { httpCall } from '@/shared/api/httpCall'
import type {
  LoginPayloadInterface,
  RegisterPayloadInterface
} from "@/interfaces/auth/auth.interface.ts";
import type { UserInterface } from "@/interfaces/user/user.interface.ts";

const useAuthApi = () => {
  const register = (data: RegisterPayloadInterface) => {
    return httpCall<UserInterface>({
      method: 'post',
      url: '/auth/register',
      data
    })
  }

  const login = (data: LoginPayloadInterface) => {
    return httpCall<UserInterface>({
      method: 'post',
      url: '/auth/login',
      data
    })
  }

  const logout = () => {
    return httpCall({
      method: 'post',
      url: '/auth/logout',
    })
  }

  return { register, login, logout }
}

export default useAuthApi;
