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
  stats: StatsGetTopStatsI = { topSocial: [], topCountries: [] };
  bodyArtist = new GetAllDto();
  bodySite = new GetAllDto({
    map: false,
    type: '',
  });
  bodyEvent = new GetAllDto({
    order: ['date', 'asc'],
  });
  bodyMedia = new GetAllDto({ type: '' });
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
