import { httpCall } from '@/shared/api/httpCall'
import type { UserInterface } from "@/interfaces/user/user.interface.ts";

const useUserApi = () => {
  const me = () => {
    return httpCall<UserInterface>({method: 'get', url: '/users/me' })
  }

  return { me }
}

export default useUserApi;
