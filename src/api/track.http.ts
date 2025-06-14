import { httpCall } from '@/shared/api/httpCall'
import type {
  TrackInterface,
  TrackIndexPayloadInterface,
  TrackCreatePayloadInterface,
  TrackUpdatePayloadInterface
} from "@/interfaces/track/track.interface.ts";

const useTrackApi = () => {
  const get = (data: TrackIndexPayloadInterface | null) => {
    return httpCall<TrackInterface[]>({
      method: 'get',
      url: '/tracks',
      params: data
    })
  }

  const getActive = () => {
    return httpCall<TrackInterface>({
      method: 'get',
      url: '/tracks/active',
    })
  }

  const create = (data: TrackCreatePayloadInterface) => {
    return httpCall<TrackInterface>({
      method: 'post',
      url: '/tracks',
      data,
    })
  }

  const update = (id: number, data: TrackUpdatePayloadInterface) => {
    return httpCall<TrackInterface>({
      method: 'post',
      url: '/tracks/' + id,
      data,
    })
  }

  const destroy = (id: number) => {
    return httpCall({
      method: 'delete',
      url: '/tracks/' + id,
    })
  }

  return { get, getActive, create, update, destroy }
}

export default useTrackApi;
