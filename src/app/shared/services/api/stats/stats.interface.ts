export interface StatsGetTopStatsI {
  topSocial: StatsTopSocialI[];
  topCountries: StatsTopCountriesI[];
}

export interface StatsTopSocialI {
  name: string;
  value: number;
  percentage: number;
}

export interface StatsTopCountriesI extends StatsTopSocialI {
  id: string;
}
