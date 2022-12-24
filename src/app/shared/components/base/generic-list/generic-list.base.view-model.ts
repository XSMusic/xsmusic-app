import { GetAllDto, FilterListI } from '@interfaces';
import { Artist, Site, Media, Event } from '@models';
import { EventGetAllDto } from '@shared/services/api/event/event.dto';
import { SiteGetAllDto } from '@shared/services/api/site/site.dto';
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
  view = 'gallery';
  service!: Observable<any>;
  bodyArtist: GetAllDto = {
    page: 1,
    pageSize: 30,
    order: ['created', 'desc'],
  };
  bodyEvent: EventGetAllDto = {
    page: 1,
    pageSize: 30,
    order: ['date', 'asc'],
  };
  bodySite: SiteGetAllDto = {
    page: 1,
    pageSize: 30,
    order: ['created', 'desc'],
    type: 'club',
    map: false,
  };
  bodySiteMap: SiteGetAllDto = {
    page: 1,
    pageSize: 1000,
    order: ['created', 'desc'],
    type: 'club',
    map: true,
    maxDistance: 10000,
  };
  bodyMedia: GetAllDto = {
    page: 1,
    pageSize: 30,
    order: ['updated', 'desc'],
    type: '',
  };
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
