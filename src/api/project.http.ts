import { httpCall } from '@/shared/api/httpCall.ts'
import type {
  ProjectCreatePayloadInterface,
  ProjectInterface,
  ProjectUpdatePayloadInterface
} from '@/interfaces/project/project.interface.ts'

const useProjectApi = () => {
  const get = () => {
    return httpCall<ProjectInterface[]>({
      method: 'get',
      url: '/projects',
    })
  }

  const getByID = (id: number) => {
    return httpCall<ProjectInterface>({
      method: 'get',
      url: '/projects/' + id,
    })
  }

  const create = (data: ProjectCreatePayloadInterface) => {
    return httpCall<ProjectInterface>({
      method: 'post',
      url: '/projects',
      data
    })
  }

  const update = (id: number, data: ProjectUpdatePayloadInterface) => {
    return httpCall<ProjectInterface>({
      method: 'post',
      url: '/projects/' + id,
      data
    })
  }

  const destroy = (id: number) => {
    return httpCall({
      method: 'delete',
      url: '/projects/' + id,
    })
  }

  return { get, getByID, create, update, destroy }
}

export default useProjectApi;