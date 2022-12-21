export interface StatsGetTopStatsI {
  topSocial: StatsTopSocialI[];
  topCountries: StatsTopSocialI[];
  topStyles?: StatsTopSocialI[];
  topStates?: StatsTopSocialI[];
  topVarious?: StatsTopSocialI[];
}

export interface StatsTopSocialI {
  id?: string;
  name: string;
  value: number;
  percentage: number;
}
