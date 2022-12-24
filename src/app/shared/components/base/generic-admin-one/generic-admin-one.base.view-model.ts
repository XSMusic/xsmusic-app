import { Artist, Site, Media, Event } from '@models';
import { GetAllDto } from '@shared/services/api/api.dtos';

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
  bodyEvents!: GetAllDto;
  bodyMediaSet: GetAllDto;
  bodyMediaTrack: GetAllDto;

  constructor() {
    this.bodyEvents = new GetAllDto({ order: ['date', 'asc'] });
    this.bodyMediaSet = new GetAllDto({ typeMedia: 'set' });
    this.bodyMediaTrack = new GetAllDto({ typeMedia: 'track' });
  }
}
