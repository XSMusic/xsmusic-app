import { StatsGetTopStatsI } from '@shared/services/api/stats/stats.interface';
import { of } from 'rxjs';
import { getAllGeneric } from './services-helper.mock';

export const apiServiceMock = {
  getAll: () => getAllGeneric(),
};

export const scrapingServiceMock = {
  getAll: () => getAllGeneric(),
};

export const imageServiceMock = {
  getAll: () => getAllGeneric(),
};

export const uiServiceMock = {
  fullImage: {},
  ga: {},
  meta: {},
  modal: {
    showModal: () => null,
  },
  navigation: {},
  spinner: {},
  toast: {
    showToast: () => true,
  },
};

export const statsServiceMock = {
  getTopStats: () =>
    of<StatsGetTopStatsI>({
      topSocial: [],
      topCountries: [],
    }),
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
