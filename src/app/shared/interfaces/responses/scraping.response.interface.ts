export interface ScrapingGetInfoArtistResponse {
  name: string;
  images: string[];
  birthdate: string;
  styles: any[];
  country: string;
  gender: string;
  info: string;
  social: {
    web: string;
    facebook: string;
    twitter: string;
    spotify: string;
    soundcloud: string;
  };
}

export interface ScrapingGetInfoClubResponse {
  name: string;
  images: string[];
  address: {
    street: string;
    town: string;
    state: string;
    country: string;
    coordinates: number[];
  };
}
