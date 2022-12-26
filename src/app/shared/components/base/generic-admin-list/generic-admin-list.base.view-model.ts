import { Artist, Site, Media, Youtube, Event, Style, User } from '@models';
import { GetAllDto } from '@shared/services/api/api.dtos';
import { StatsGetTopStatsI } from '@shared/services/api/stats/stats.interface';
import { GenericItemsType, GenericBodyType, TabsType } from '@shared/utils';

export class GenericAdminListBaseViewModel {
  typeItems!: GenericItemsType;
  typeBody!: GenericBodyType;
  typeTabs!: TabsType;
  title!: string;
  artists: Artist[] = [];
  sites: Site[] = [];
  events: Event[] = [];
  medias: Media[] = [];
  styles: Style[] = [];
  users: User[] = [];
  artist = new Artist();
  event = new Event();
  media = new Media();
  site = new Site();
  style = new Style();
  stats: StatsGetTopStatsI = { topSocial: [], topCountries: [] };
  bodyArtist = new GetAllDto();
  bodyEvent = new GetAllDto({
    order: ['date', 'asc'],
  });
  bodyMedia = new GetAllDto({ type: '' });
  bodySite = new GetAllDto({
    map: false,
    type: '',
  });
  bodyStyle = new GetAllDto({ type: '' });
  bodyUser = new GetAllDto({ type: '' });
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
