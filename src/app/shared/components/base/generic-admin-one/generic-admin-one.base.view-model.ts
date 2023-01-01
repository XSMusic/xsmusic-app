import { Artist, Site, Media, Event, User, Style, Like, Image } from '@models';
import { GetAllDto } from '@shared/services/api/api.dtos';
import { ApiTypes, GenericSubItemType, TabsType } from '@shared/utils';

export class GenericAdminOneBaseViewModel {
  subType!: GenericSubItemType;
  typeTabs!: TabsType;
  apiType!: ApiTypes;
  artist = new Artist();
  event = new Event();
  image = new Image();
  like = new Like();
  media = new Media();
  site = new Site();
  style = new Style();
  user = new User();
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
  tempImagesByUrl: string[] = [];
  tempImagesByFile: File[] = [];
  scraping: any = {
    images: [],
    infos: [],
    styles: [],
  };

  constructor() {
    this.bodyEvents = new GetAllDto({ order: ['date', 'asc'] });
    this.bodyMediaSet = new GetAllDto({ typeMedia: 'set' });
    this.bodyMediaTrack = new GetAllDto({ typeMedia: 'track' });
  }
}
