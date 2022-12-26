import { Artist, Event, Media, Site, Style } from '@models';
import { GetAllDto } from '@shared/services/api/api.dtos';

export class HomeViewModel {
  items: any[] = [
    {
      type: 'artists',
      typeItems: 'artists',
    },
    {
      type: 'events',
      typeItems: 'events',
    },
    {
      type: 'media',
      typeItems: 'sets',
    },
    {
      type: 'media',
      typeItems: 'tracks',
    },
    {
      type: 'sites',
      typeItems: 'clubs',
    },
    {
      type: 'sites',
      typeItems: 'festivals',
    },
  ];
  bodyArtists: GetAllDto = new GetAllDto();
  bodyEvents: GetAllDto = new GetAllDto({
    pageSize: 8,
    order: ['date', 'asc'],
  });
  bodyMedia: GetAllDto = new GetAllDto({
    pageSize: 4,
    type: 'set',
  });
  bodySites: GetAllDto = new GetAllDto({
    pageSize: 15,
    type: 'club',
    map: false,
  });
  artists!: Artist[];
  events!: Event[];
  sets: Media[] = [];
  tracks: Media[] = [];
  clubs: Site[] = [];
  festivals: Site[] = [];
  styles: Style[] = [];
  users: Style[] = [];
  loading: any = {
    artists: true,
    events: true,
    sets: true,
    tracks: true,
    clubs: true,
    festivals: true,
  };
  error: any = {
    artists: false,
    events: false,
    sets: false,
    tracks: false,
    sites: false,
    clubs: false,
    festivals: false,
  };
}
