import { GetAllDto } from '@interfaces';
import { Artist, Site, Media, Youtube, Event } from '@models';
import { ApiGenericBody } from '@shared/services/api/api-generic-body';
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
  bodyArtist: ApiGenericBody;
  bodySite: ApiGenericBody;
  bodyEvent: ApiGenericBody;
  bodyMedia: ApiGenericBody;
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
    this.bodyArtist = new ApiGenericBody({ pageSize: 20 });
    this.bodyMedia = new ApiGenericBody({ pageSize: 20, type: '' });
    this.bodySite = new ApiGenericBody({
      pageSize: 20,
      map: false,
      type: '',
    });
    this.bodyEvent = new ApiGenericBody({
      pageSize: 20,
      order: ['date', 'asc'],
      filter: [],
    });
  }
}
