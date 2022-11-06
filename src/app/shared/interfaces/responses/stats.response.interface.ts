export interface StatsTotalsAdminI {
  artists: StatsTotalAdminItemI;
  styles: StatsTotalAdminItemI;
  sets: StatsTotalAdminItemI;
  tracks: StatsTotalAdminItemI;
  clubs: StatsTotalAdminItemI;
  festivals: StatsTotalAdminItemI;
  events: StatsTotalAdminItemI;
  users: StatsTotalAdminItemI;
}

export interface StatsTotalAdminItemI {
  total: number;
  percentages: { days: string; value: number }[];
}

export interface StatsGetTopArtistsI {
  id: string;
  name: string;
  total: number;
}
