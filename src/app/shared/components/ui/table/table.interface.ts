export type TabbleHeaderType =
  | 'artists'
  | 'clubs'
  | 'country'
  | 'countrySite'
  | 'date'
  | 'dateTime'
  | 'events'
  | 'festivals'
  | 'image'
  | 'images'
  | 'likes'
  | 'media'
  | 'name'
  | 'nameAddress'
  | 'nameBirthdate'
  | 'nameArtists'
  | 'nameImage'
  | 'nameLike'
  | 'normal'
  | 'sets'
  | 'site'
  | 'styles'
  | 'type'
  | 'tracks'
  | 'userlike'
  | 'year';

export interface TableHeaderI {
  key: string;
  name: string;
  type: TabbleHeaderType;
  index?: number;
  action?: string;
  sortable?: boolean;
}

export interface TableHeaderItemI {
  name: string;
  headers: TableHeaderI[];
}
