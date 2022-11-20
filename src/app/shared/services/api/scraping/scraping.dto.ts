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
