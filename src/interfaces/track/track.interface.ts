import type { ProjectInterface } from '@/interfaces/project/project.interface.ts'

export interface TrackInterface {
  id: number
  title: string | null
  started_at: string
  finished_at: string | null

  project: ProjectInterface | null
}

export interface TrackIndexPayloadInterface {
  from: string
  to: string
}

export interface TrackCreatePayloadInterface {
  title?: string | null
  project_id?: number | null
  // started_at: string
  // finished_at: string | null
}

export interface TrackUpdatePayloadInterface {
  title?: string | null
  project_id?: number | null
  started_at?: string
  finished_at?: string
}
