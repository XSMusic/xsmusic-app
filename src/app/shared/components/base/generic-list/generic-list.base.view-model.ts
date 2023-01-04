import { FilterListI } from '@interfaces';
import { Artist, Site, Media, Event, User, Style, Like, Image } from '@models';
import { GetAllDto } from '@shared/services/api/api.dtos';
import { GenericBodyType, GenericItemsType, TabsType } from '@shared/utils';
import { Observable } from 'rxjs';

export class GenericListBaseViewModel {
  typeItems!: GenericItemsType;
  typeBody!: GenericBodyType;
  typeTabs!: TabsType;
  typeAdminRoute: any;
  title!: string;
  artists: Artist[] = [];
  events: Event[] = [];
  images: Image[] = [];
  likes: Like[] = [];
  medias: Media[] = [];
  sites: Site[] = [];
  sitesMap: Site[] = [];
  styles: Style[] = [];
  users: User[] = [];
  view = 'gallery';
  service!: Observable<any>;
  bodyArtist = new GetAllDto({
    pageSize: 30,
  });
  bodyEvent = new GetAllDto({
    pageSize: 30,
    order: ['date', 'asc'],
  });
  bodyImage = new GetAllDto();
  bodyLike = new GetAllDto();
  bodySite = new GetAllDto({
    pageSize: 30,
    type: 'club',
    map: false,
    order: ['created', 'asc'],
  });
  bodySiteMap = new GetAllDto({
    pageSize: 1000,
    type: 'club',
    map: true,
    maxDistance: 600,
  });
  bodyMedia = new GetAllDto({
    pageSize: 30,
  });
  bodyUser = new GetAllDto();
  bodyStyle = new GetAllDto();
  filter = false;
  filterData!: FilterListI;
  loading = true;
  error = false;
  typeForGalleryView!:
    | 'artist'
    | 'club'
    | 'event'
    | 'eventScraping'
    | 'set'
    | 'track'
    | 'festival';
}
