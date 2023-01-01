import { Artist, Site, Media, Event, Like, Image } from '@models';
import { GetAllDto } from '@shared/services/api/api.dtos';

export class GenericOneBaseViewModel {
  artist!: Artist;
  event!: Event;
  image!: Image;
  like!: Like;
  media!: Media;
  site!: Site;
  style!: Site;
  user!: Site;
  slug!: string;
  views: any[] = [];
  bodyEvents: GetAllDto;
  bodyMediaSet: GetAllDto;
  bodyMediaTrack: GetAllDto;
  events: Event[] = [];
  sets: Media[] = [];
  tracks: Media[] = [];

  constructor() {
    this.bodyEvents = new GetAllDto({
      order: ['date', 'asc'],
    });
    this.bodyMediaSet = new GetAllDto({
      id: '',
      type: '',
      typeMedia: 'set',
    });
    this.bodyMediaTrack = new GetAllDto({
      id: '',
      type: '',
      typeMedia: 'track',
    });
  }
}
