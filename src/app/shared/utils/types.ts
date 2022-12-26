export type GenericItemsType = 'artists' | 'sites' | 'events' | 'medias';
export type GenericItemsAllType =
  | 'artists'
  | 'events'
  | 'sets'
  | 'tracks'
  | 'clubs'
  | 'festivals';
export type GenericItemType =
  | 'artist'
  | 'event'
  | 'media'
  | 'site'
  | 'style'
  | 'user';
export type GenericItemAllType =
  | 'artist'
  | 'club'
  | 'festival'
  | 'event'
  | 'set'
  | 'track'
  | 'user';
export type GenericBodyType =
  | 'bodyArtist'
  | 'bodySite'
  | 'bodyEvent'
  | 'bodyMedia';
export type GenericSubItemType = 'club' | 'festival' | 'set' | 'track';

export type GoToType =
  | 'artist'
  | 'club'
  | 'event'
  | 'eventSite'
  | 'eventScraping'
  | 'set'
  | 'track'
  | 'festival'
  | 'style'
  | 'user';
export type GoToRouteType = 'all' | 'one';

export type ApiTypes =
  | 'artists'
  | 'events'
  | 'images'
  | 'media'
  | 'sites'
  | 'styles'
  | 'users';

export type TabsType =
  | 'generic'
  | 'artists'
  | 'artistsAdmin'
  | 'artistAdmin'
  | 'events'
  | 'eventsAdmin'
  | 'eventsScraping'
  | 'eventAdmin'
  | 'sites'
  | 'siteAdmin'
  | 'sitesAdmin'
  | 'media'
  | 'mediaAdmin'
  | 'styles'
  | 'styleAdmin'
  | 'userAdmin';
