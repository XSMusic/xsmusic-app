import { TabsItem } from './tabs.model';

export const tabsByType = [
  {
    name: 'artists',
    buttons: [
      new TabsItem({
        name: 'Listado',
        isActivatable: true,
        action: 'viewGallery',
      }),
      new TabsItem({
        name: 'Filtrar',
        isActivatable: true,
        action: 'filter',
      }),
      new TabsItem({
        name: 'Buscar',
        isActivatable: true,
        action: 'search',
      }),
    ],
  },
  {
    name: 'artistsAdmin',
    buttons: [
      new TabsItem({
        name: 'Listado',
        action: 'viewList',
        isActivatable: true,
      }),
      new TabsItem({
        name: 'Nuevo',
        action: 'viewAdd',
        isActivatable: true,
      }),
      new TabsItem({
        name: 'Estadisticas',
        action: 'viewStats',
        isActivatable: true,
      }),
      new TabsItem({
        name: 'Filtrar',
        action: 'filter',
        align: 'right',
      }),
      new TabsItem({
        name: 'Buscar',
        action: 'search',
        align: 'right',
      }),
    ],
  },
  {
    name: 'artistAdmin',
    buttons: [
      new TabsItem({
        name: 'Info',
        isActivatable: true,
        action: 'viewInfo',
      }),
      new TabsItem({
        name: 'Opciones',
        isActivatable: true,
        action: 'viewOptions',
      }),
      new TabsItem({
        name: 'Sesiones',
        isActivatable: true,
        action: 'viewSets',
      }),
      new TabsItem({
        name: 'Tracks',
        isActivatable: true,
        action: 'viewTracks',
      }),
      new TabsItem({
        name: 'Eventos',
        isActivatable: true,
        action: 'viewEvents',
      }),
    ],
  },
  {
    name: 'events',
    buttons: [
      new TabsItem({
        name: 'Listado',
        isActivatable: true,
        action: 'viewGallery',
      }),
      new TabsItem({
        name: 'Buscar',
        isActivatable: true,
        action: 'search',
      }),
    ],
  },
  {
    name: 'eventsScraping',
    buttons: [
      new TabsItem({
        name: 'Completos',
        action: 'viewCompleted',
        isActivatable: true,
      }),
      new TabsItem({
        name: 'Incompletos',
        action: 'viewNotCompleted',
        isActivatable: true,
      }),
    ],
  },
  {
    name: 'eventsAdmin',
    buttons: [
      new TabsItem({
        name: 'Listado',
        action: 'viewList',
        isActivatable: true,
      }),
      new TabsItem({
        name: 'Nuevo',
        action: 'viewAdd',
        isActivatable: true,
      }),
      new TabsItem({
        name: 'Scraping',
        action: 'viewScraping',
        isActivatable: true,
      }),
      new TabsItem({
        name: 'Estadisticas',
        action: 'viewStats',
        isActivatable: true,
      }),
      new TabsItem({
        name: 'Buscar',
        action: 'search',
        align: 'right',
      }),
    ],
  },
  {
    name: 'eventAdmin',
    buttons: [
      new TabsItem({
        name: 'Info',
        isActivatable: true,
        action: 'viewInfo',
      }),
      new TabsItem({
        name: 'Opciones',
        isActivatable: true,
        action: 'viewOptions',
      }),
    ],
  },
  {
    name: 'likesAdmin',
    buttons: [
      new TabsItem({
        name: 'Listado',
        isActivatable: true,
        action: 'viewList',
      }),
    ],
  },
  {
    name: 'imagesAdmin',
    buttons: [
      new TabsItem({
        name: 'Listado',
        isActivatable: true,
        action: 'viewList',
      }),
    ],
  },
  {
    name: 'media',
    buttons: [
      new TabsItem({
        name: 'Listado',
        isActivatable: true,
        action: 'viewGallery',
      }),
      new TabsItem({
        name: 'Filtrar',
        isActivatable: true,
        action: 'filter',
      }),
      new TabsItem({
        name: 'Buscar',
        isActivatable: true,
        action: 'search',
      }),
    ],
  },
  {
    name: 'mediasAdmin',
    buttons: [
      new TabsItem({
        name: 'Listado',
        action: 'viewList',
        isActivatable: true,
      }),
      new TabsItem({
        name: 'Nuevo',
        action: 'viewAdd',
        isActivatable: true,
      }),
      new TabsItem({
        name: 'Filtrar',
        action: 'filter',
        align: 'right',
      }),
      new TabsItem({
        name: 'Buscar',
        action: 'search',
        align: 'right',
      }),
    ],
  },
  {
    name: 'mediaAdmin',
    buttons: [
      new TabsItem({
        name: 'Info',
        isActivatable: true,
        action: 'viewInfo',
      }),
    ],
  },
  {
    name: 'sites',
    buttons: [
      new TabsItem({
        name: 'Listado',
        action: 'viewGallery',
        isActivatable: true,
      }),
      new TabsItem({
        name: 'Mapa',
        action: 'viewMap',
        isActivatable: true,
      }),
      new TabsItem({
        name: 'Filtrar',
        action: 'filter',
      }),
      new TabsItem({
        name: 'Buscar',
        action: 'search',
      }),
    ],
  },
  {
    name: 'sitesAdmin',
    buttons: [
      new TabsItem({
        name: 'Listado',
        action: 'viewList',
        isActivatable: true,
      }),
      new TabsItem({
        name: 'Nuevo',
        action: 'viewAdd',
        isActivatable: true,
      }),
      new TabsItem({
        name: 'Estadisticas',
        action: 'viewStats',
        isActivatable: true,
      }),
      new TabsItem({
        name: 'Filtrar',
        action: 'filter',
        align: 'right',
      }),
      new TabsItem({
        name: 'Buscar',
        action: 'search',
        align: 'right',
      }),
    ],
  },
  {
    name: 'siteAdmin',
    buttons: [
      new TabsItem({
        name: 'Info',
        isActivatable: true,
        action: 'viewInfo',
      }),
      new TabsItem({
        name: 'Opciones',
        isActivatable: true,
        action: 'viewOptions',
      }),
      new TabsItem({
        name: 'Scraping Event',
        isActivatable: true,
        action: 'viewScrapingEvent',
      }),
      new TabsItem({
        name: 'Eventos',
        isActivatable: true,
        action: 'viewEvents',
      }),
      new TabsItem({
        name: 'Sets',
        isActivatable: true,
        action: 'viewSets',
      }),
    ],
  },
  {
    name: 'styles',
    buttons: [
      new TabsItem({
        name: 'Nuevo',
        action: 'add',
      }),
      new TabsItem({
        name: 'Buscar',
        action: 'search',
      }),
    ],
  },
  {
    name: 'styleAdmin',
    buttons: [
      new TabsItem({
        name: 'Info',
        isActivatable: true,
        action: 'viewInfo',
      }),
      new TabsItem({
        name: 'Artistas',
        isActivatable: true,
        action: 'viewArtists',
      }),
      new TabsItem({
        name: 'Sets',
        isActivatable: true,
        action: 'viewSets',
      }),
      new TabsItem({
        name: 'Tracks',
        isActivatable: true,
        action: 'viewTracks',
      }),
      new TabsItem({
        name: 'Clubs',
        isActivatable: true,
        action: 'viewClubs',
      }),
      new TabsItem({
        name: 'Festivales',
        isActivatable: true,
        action: 'viewFestivals',
      }),
    ],
  },
  {
    name: 'stylesAdmin',
    buttons: [
      new TabsItem({
        name: 'Listado',
        action: 'viewList',
        isActivatable: true,
      }),
    ],
  },
  {
    name: 'userAdmin',
    buttons: [
      new TabsItem({
        name: 'Info',
        action: 'viewInfo',
        isActivatable: true,
      }),
    ],
  },
  {
    name: 'usersAdmin',
    buttons: [
      new TabsItem({
        name: 'Listado',
        action: 'viewList',
        isActivatable: true,
      }),
    ],
  },
];
