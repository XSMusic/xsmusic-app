export interface GoToPageI {
  type?:
    | 'artist'
    | 'club'
    | 'event'
    | 'eventSite'
    | 'eventScraping'
    | 'set'
    | 'track'
    | 'festival'
    | 'user';
  typeRoute: 'all' | 'one';
  admin?: boolean;
  item?: any;
}
