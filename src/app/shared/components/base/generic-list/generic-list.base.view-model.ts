import { FilterListI } from '@interfaces';
import { Artist, Site, Media, Event } from '@models';
import { ApiGenericBody } from '@shared/services/api/api-generic-body';
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
  bodyArtist: ApiGenericBody;
  bodyEvent: ApiGenericBody;
  bodySite: ApiGenericBody;
  bodySiteMap: ApiGenericBody;
  bodyMedia: ApiGenericBody;
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

  constructor() {
    this.bodyArtist = new ApiGenericBody({
      pageSize: 30,
    });
    this.bodyEvent = new ApiGenericBody({
      pageSize: 30,
      order: ['date', 'asc'],
    });
    this.bodySite = new ApiGenericBody({
      pageSize: 30,
      type: 'club',
      map: false,
    });
    this.bodySiteMap = new ApiGenericBody({
      pageSize: 1000,
      type: 'club',
      map: true,
      maxDistance: 10000,
    });
    this.bodyMedia = new ApiGenericBody({
      pageSize: 30,
    });
  }
}
