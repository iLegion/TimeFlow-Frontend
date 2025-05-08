import { httpCall } from '@/shared/api/httpCall'

const useTrackApi = () => {
  const get = () => {
    return httpCall({
      method: 'get',
      url: '/tracks',
    })
  }

  return { get }
}

export default useTrackApi;
