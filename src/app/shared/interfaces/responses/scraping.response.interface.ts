export interface ScrapingGetInfoArtistResponse {
  name: string;
  image: string;
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
