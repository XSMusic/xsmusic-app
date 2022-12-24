import { Artist, Site, Media, Youtube, Event } from '@models';
import { GetAllDto } from '@shared/services/api/api.dtos';
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
  bodyArtist: GetAllDto;
  bodySite: GetAllDto;
  bodyEvent: GetAllDto;
  bodyMedia: GetAllDto;
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

  constructor() {
    this.bodyArtist = new GetAllDto({ pageSize: 20 });
    this.bodyMedia = new GetAllDto({ pageSize: 20, type: '' });
    this.bodySite = new GetAllDto({
      pageSize: 20,
      map: false,
      type: '',
    });
    this.bodyEvent = new GetAllDto({
      pageSize: 20,
      order: ['date', 'asc'],
      filter: [],
    });
  }
}
