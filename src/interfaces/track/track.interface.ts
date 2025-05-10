export interface TrackInterface {
  id: number
  title: string | null
  started_at: string
  finished_at: string | null
}

export interface TrackCreatePayloadInterface {
  title: string | null
  // started_at: string
  // finished_at: string | null
}

export interface TrackUpdatePayloadInterface {
  title: string | null
  // started_at: string | null
  // finished_at: string | null
}
