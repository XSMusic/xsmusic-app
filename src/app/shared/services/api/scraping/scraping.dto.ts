export interface ScrapingGetInfoArtistDto {
  name: string;
  countryCode?: string;
}

export interface ScrapingGetInfoClubDto {
  name: string;
  poblation: string;
}

export interface ScrapingGetListMediaDto {
  query: string;
  maxResults: string;
  source: 'youtube' | 'soundcloud';
}

export interface ScrapingGetListEventsDto {
  source: string;
  area: string;
  maxResults: string;
  dateFrom: string;
  dateTo: string;
}
