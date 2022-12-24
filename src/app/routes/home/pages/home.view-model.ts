import { GetAllDto } from '@interfaces';
import { Artist, Event, Media, Site } from '@models';
import { EventGetAllDto } from '@shared/services/api/event/event.dto';
import { SiteGetAllDto } from '@shared/services/api/site/site.dto';

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
  bodyArtists: GetAllDto = {
    page: 1,
    pageSize: 20,
    order: ['created', 'desc'],
  };
  bodyEvents: EventGetAllDto = {
    page: 1,
    pageSize: 6,
    order: ['date', 'asc'],
  };
  bodyMedia: GetAllDto = {
    page: 1,
    pageSize: 4,
    order: ['created', 'desc'],
    type: 'set',
  };
  bodySites: SiteGetAllDto = {
    page: 1,
    pageSize: 10,
    order: ['created', 'desc'],
    type: 'club',
    map: false,
  };
  artists!: Artist[];
  events!: Event[];
  sets: Media[] = [];
  tracks: Media[] = [];
  clubs: Site[] = [];
  festivals: Site[] = [];
  loading = {
    artists: true,
    events: true,
    sets: true,
    tracks: true,
    clubs: true,
    festivals: true,
  };
  error = {
    artists: false,
    events: false,
    sets: false,
    tracks: false,
    sites: false,
    clubs: false,
    festivals: false,
  };
}
