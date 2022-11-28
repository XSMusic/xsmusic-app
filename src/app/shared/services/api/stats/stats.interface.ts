export interface StatsArtistsI {
  topSocial: StatsTopSocialI[];
}

export interface StatsTopSocialI {
  name: string;
  value: number;
  percentage: number;
}
