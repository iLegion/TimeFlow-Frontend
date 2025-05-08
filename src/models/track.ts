import type { TrackInterface } from "@/interfaces/track/track.interface.ts";

class Track implements TrackInterface {
  public id: number;

  public title: string | null;

  public started_at: string;

  public finished_at: string | null;

  constructor(data: TrackInterface) {
    this.id = data.id;
    this.title = data.title;
    this.started_at = data.started_at;
    this.finished_at = data.finished_at;
  }
}
