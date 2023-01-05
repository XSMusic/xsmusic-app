export type GenericItemsType =
  | 'artists'
  | 'sites'
  | 'events'
  | 'images'
  | 'likes'
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
  | 'image'
  | 'media'
  | 'site'
  | 'like'
  | 'style'
  | 'user';
export type GenericItemAllType =
  | 'artist'
  | 'club'
  | 'festival'
  | 'event'
  | 'image'
  | 'like'
  | 'set'
  | 'style'
  | 'track'
  | 'user';
export type GenericBodyType =
  | 'bodyArtist'
  | 'bodyEvent'
  | 'bodyImage'
  | 'bodyLike'
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
  | 'image'
  | 'home'
  | 'like'
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
  | 'likes'
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
  | 'imagesAdmin'
  | 'likeAdmin'
  | 'likesAdmin'
  | 'media'
  | 'mediasAdmin'
  | 'mediaAdmin'
  | 'sites'
  | 'siteAdmin'
  | 'sitesAdmin'
  | 'styleAdmin'
  | 'stylesAdmin'
  | 'userAdmin'
  | 'usersAdmin';

export type GalleryViewType =
  | 'artist'
  | 'club'
  | 'event'
  | 'eventScraping'
  | 'set'
  | 'track'
  | 'festival';
