import { getAllGeneric } from './services-helper.mock';

export const apiServiceMock = {
  getAll: () => getAllGeneric(),
};

export const siteServiceMock = {
  getAll: () => getAllGeneric(),
};

export const mediaServiceMock = {
  getAll: () => getAllGeneric(),
};

export const eventServiceMock = {
  getAll: () => getAllGeneric(),
};

export const fullImageServiceMock = jasmine.createSpyObj('FullImageService', [
  'show',
  'dismiss',
]);

export const gaServiceMock = jasmine.createSpyObj('GoogleAnalyticsService', [
  'event',
]);

export const routerMock = jasmine.createSpyObj('Router', ['navigate']);

export const svgIconRegistryServiceMock = jasmine.createSpyObj(
  'SvgIconRegistryService',
  ['getSvgByName']
);
