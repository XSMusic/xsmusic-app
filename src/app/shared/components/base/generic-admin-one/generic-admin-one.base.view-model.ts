import { Artist, Site, Media, Event } from '@models';
import { ApiGenericBody } from '@shared/services/api/api-generic-body';

export class GenericAdminOneBaseViewModel {
  typeTabs!: 'artistAdmin' | 'eventAdmin' | 'siteAdmin' | 'mediaAdmin';
  artist = new Artist();
  site = new Site();
  event = new Event();
  media = new Media();
  id!: string;
  views: any[] = [];
  title!: string;
  events: Event[] = [];
  sets: Media[] = [];
  tracks: Media[] = [];
  view = 'viewList';
  options: { name: string; action: string }[] = [];
  bodyEvents!: ApiGenericBody;
  bodyMediaSet: ApiGenericBody;
  bodyMediaTrack: ApiGenericBody;

  constructor() {
    this.bodyEvents = new ApiGenericBody({ order: ['date', 'asc'] });
    this.bodyMediaSet = new ApiGenericBody({ typeMedia: 'set' });
    this.bodyMediaTrack = new ApiGenericBody({ typeMedia: 'track' });
  }
}
