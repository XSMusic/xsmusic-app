import {
  Artist,
  Site,
  Media,
  Youtube,
  Event,
  Style,
  User,
  Like,
  Image,
} from '@models';
import { GetAllDto } from '@shared/services/api/api.dtos';
import { StatsGetTopStatsI } from '@shared/services/api/stats/stats.interface';
import {
  GenericItemsType,
  GenericBodyType,
  TabsType,
  ApiTypes,
} from '@shared/utils';

export class GenericAdminListBaseViewModel {
  typeItems!: GenericItemsType;
  typeBody!: GenericBodyType;
  typeTabs!: TabsType;
  apiType!: ApiTypes;
  title!: string;
  artists: Artist[] = [];
  sites: Site[] = [];
  events: Event[] = [];
  images: Image[] = [];
  likes: Like[] = [];
  medias: Media[] = [];
  styles: Style[] = [];
  users: User[] = [];
  artist = new Artist();
  event = new Event();
  image = new Image();
  media = new Media();
  site = new Site();
  style = new Style();
  user = new User();
  like = new Like();
  tempImagesByUrl: string[] = [];
  tempImagesByFile: File[] = [];
  stats: StatsGetTopStatsI = { topSocial: [], topCountries: [] };
  bodyArtist = new GetAllDto();
  bodyEvent = new GetAllDto({
    order: ['date', 'asc'],
  });
  bodyImage = new GetAllDto({ admin: true, pageSize: 30 });
  bodyLike = new GetAllDto({ admin: true });
  bodyMedia = new GetAllDto({ admin: true, type: '' });
  bodySite = new GetAllDto({
    admin: true,
    map: false,
    type: '',
  });
  bodyStyle = new GetAllDto({ admin: true, order: ['name', 'asc'] });
  bodyUser = new GetAllDto({ admin: true, type: '' });
  view!: string;
  filter = false;
  loading = true;
  error = false;
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
