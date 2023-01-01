import { Artist, Event, Media, Site } from '@models';

export interface ResumeGetForAllI {
  artists: Artist[];
  events: Event[];
  clubs: Site[];
  festivals: Site[];
  sets: Media[];
  tracks: Media[];
}
