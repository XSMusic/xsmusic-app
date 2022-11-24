export interface ScrapingSourceI {
  name: string;
  value: string;
}

export interface ScrapingEventsI {
  completed: ScrapingEventI[];
  notCompleted: ScrapingEventI[];
}

export interface ScrapingEventI {
  name: string;
  date: string;
  info?: string;
  images: string[];
  site: any;
}
