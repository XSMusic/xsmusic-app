import { Artist, Site, Media, Event } from '@models';
import { EventGetAllForTypeDto } from '@shared/services/api/event/event.dto';
import { MediaGetAllForTypeDto } from '@shared/services/api/media/media.dto';

export class GenericOneBaseViewModel {
  artist!: Artist;
  site!: Site;
  event!: Event;
  slug!: string;
  views: any[] = [];
  bodyEvents: EventGetAllForTypeDto = {
    page: 1,
    pageSize: 10,
    order: ['created', 'asc'],
    id: '',
    type: '',
  };
  bodyMediaSet: MediaGetAllForTypeDto = {
    page: 1,
    pageSize: 10,
    order: ['created', 'asc'],
    id: '',
    type: '',
    typeMedia: 'set',
  };
  bodyMediaTrack: MediaGetAllForTypeDto = {
    page: 1,
    pageSize: 10,
    order: ['created', 'asc'],
    id: '',
    type: '',
    typeMedia: 'track',
  };
  events: Event[] = [];
  sets: Media[] = [];
  tracks: Media[] = [];
}
