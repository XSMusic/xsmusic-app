export type GenericItemsType =
  | 'artists'
  | 'sites'
  | 'events'
  | 'medias'
  | 'styles'
  | 'users';
export type GenericItemsAllType =
  | 'artists'
  | 'events'
  | 'sets'
  | 'tracks'
  | 'clubs'
  | 'festivals'
  | 'styles'
  | 'users';
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
  | 'style'
  | 'track'
  | 'user';
export type GenericBodyType =
  | 'bodyArtist'
  | 'bodyEvent'
  | 'bodyMedia'
  | 'bodySite'
  | 'bodyStyle'
  | 'bodyUser';
export type GenericSubItemType = 'club' | 'festival' | 'set' | 'track';

export type GoToType =
  | 'admin'
  | 'artist'
  | 'club'
  | 'event'
  | 'eventSite'
  | 'eventScraping'
  | 'home'
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
  | 'styleAdmin'
  | 'stylesAdmin'
  | 'userAdmin'
  | 'usersAdmin';
