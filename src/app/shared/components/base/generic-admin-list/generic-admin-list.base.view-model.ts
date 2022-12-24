import { GetAllDto } from '@interfaces';
import { Artist, Site, Media, Youtube, Event } from '@models';
import { EventGetAllDto } from '@shared/services/api/event/event.dto';
import { StatsGetTopStatsI } from '@shared/services/api/stats/stats.interface';
import { GenericItemsType, GenericBodyType } from '@shared/utils';

export class GenericAdminListBaseViewModel {
  typeItems!: GenericItemsType;
  typeBody!: GenericBodyType;
  typeTabs!: 'artistsAdmin' | 'eventsAdmin' | 'sitesAdmin' | 'mediaAdmin';
  title!: string;
  artists: Artist[] = [];
  sites: Site[] = [];
  events: Event[] = [];
  medias: Media[] = [];
  artist: Artist = new Artist();
  site: Site = new Site();
  event: Event = new Event();
  media: Media = new Media();
  stats: StatsGetTopStatsI = {
    topSocial: [],
    topCountries: [],
  };
  bodyArtist: GetAllDto = {
    page: 1,
    pageSize: 20,
    order: ['updated', 'desc'],
  };
  bodySite: GetAllDto = {
    page: 1,
    pageSize: 20,
    map: false,
    type: '',
    order: ['updated', 'desc'],
  };
  bodyEvent: EventGetAllDto = {
    page: 1,
    pageSize: 20,
    order: ['date', 'asc'],
    filter: [],
  };
  bodyMedia: GetAllDto = {
    page: 1,
    pageSize: 20,
    order: ['updated', 'desc'],
    type: '',
  };
  view!: string;
  filter = false;
  loading = true;
  error = false;
  total = 0;
  itemsSearch: Youtube[] = [];
  mediaSource = 'youtube';
  searchText = '';
  scraping: any = {
    images: [],
    infos: [],
    styles: [],
  };
  scrapingItemSelected!: Youtube;
}
