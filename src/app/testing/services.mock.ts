export const artistServiceMock = jasmine.createSpyObj('ArtistService', ['getAll']);
export const siteServiceMock = jasmine.createSpyObj('SiteService', ['getAll']);
export const eventServiceMock = jasmine.createSpyObj('EventService', ['getAll']);
export const mediaServiceMock = jasmine.createSpyObj('MediaService', ['getAll']);

export const gaServiceMock = jasmine.createSpyObj('GoogleAnalyticsService', [
  'event',
]);

export const svgIconRegistryServiceMock = jasmine.createSpyObj(
  'SvgIconRegistryService',
  ['getSvgByName']
);
