import { FilterListI } from '@interfaces';
import { Artist, Site, Media, Event, User, Style } from '@models';
import { GetAllDto } from '@shared/services/api/api.dtos';
import { GenericBodyType, GenericItemsType } from '@shared/utils';
import { Observable } from 'rxjs';

export class GenericListBaseViewModel {
  typeItems!: GenericItemsType;
  typeBody!: GenericBodyType;
  typeTabs!: 'artists' | 'events' | 'sites' | 'media';
  typeAdminRoute: any;
  title!: string;
  artists: Artist[] = [];
  sites: Site[] = [];
  events: Event[] = [];
  medias: Media[] = [];
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
  bodySite = new GetAllDto({
    pageSize: 30,
    type: 'club',
    map: false,
  });
  bodySiteMap = new GetAllDto({
    pageSize: 1000,
    type: 'club',
    map: true,
    maxDistance: 10000,
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
  total = 0;
  typeForGalleryView!:
    | 'artist'
    | 'club'
    | 'event'
    | 'eventScraping'
    | 'set'
    | 'track'
    | 'festival';
}
