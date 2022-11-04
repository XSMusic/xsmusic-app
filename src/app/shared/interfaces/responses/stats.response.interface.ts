export interface StatsTotalsAdminResponseI {
  artists: number;
  styles: number;
  sets: number;
  tracks: number;
  clubs: number;
  events: number;
  users: number;
}

export interface StatsGetTopArtistsResponseI {
  id: string;
  name: string;
  total: number
}
