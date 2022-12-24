import { Artist, Site, Media, Event } from '@models';
import { ApiGenericBody } from '@shared/services/api/api-generic-body';

export class GenericOneBaseViewModel {
  artist!: Artist;
  site!: Site;
  event!: Event;
  slug!: string;
  views: any[] = [];
  bodyEvents: ApiGenericBody;
  bodyMediaSet: ApiGenericBody;
  bodyMediaTrack: ApiGenericBody;
  events: Event[] = [];
  sets: Media[] = [];
  tracks: Media[] = [];

  constructor() {
    this.bodyEvents = new ApiGenericBody({
      order: ['date', 'asc'],
    });
    this.bodyMediaSet = new ApiGenericBody({
      id: '',
      type: '',
      typeMedia: 'set',
    });
    this.bodyMediaTrack = new ApiGenericBody({
      id: '',
      type: '',
      typeMedia: 'track',
    });
  }
}
