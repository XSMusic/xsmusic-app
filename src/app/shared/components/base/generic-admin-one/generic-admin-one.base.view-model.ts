import { Artist, Site, Media, Event } from '@models';
import { EventGetAllForTypeDto } from '@shared/services/api/event/event.dto';
import { MediaGetAllForTypeDto } from '@shared/services/api/media/media.dto';

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
}
