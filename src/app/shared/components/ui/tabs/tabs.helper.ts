import { TabsItem } from './tabs.model';

const genericTabs = [
  new TabsItem({
    name: 'Galeria',
    isActivatable: true,
    action: 'viewGallery',
  }),
  new TabsItem({
    name: 'Listado',
    isActivatable: true,
    action: 'viewList',
  }),
  new TabsItem({
    name: 'Filtrar',
    isActivatable: true,
    align: 'right',
    action: 'filter',
  }),
  new TabsItem({
    name: 'Buscar',
    isActivatable: true,
    align: 'right',
    action: 'search',
  }),
];

export const tabsByType = [
  {
    name: 'generic',
    buttons: genericTabs,
  },
  {
    name: 'artists',
    buttons: genericTabs,
  },
  {
    name: 'media',
    buttons: genericTabs,
  },
  {
    name: 'events',
    buttons: [
      new TabsItem({
        name: 'Galeria',
        isActivatable: true,
        action: 'viewGallery',
      }),
      new TabsItem({
        name: 'Listado',
        isActivatable: true,
        action: 'viewList',
      }),
      // new ButtonBlockItem({
      //   name: 'Calendario',
      //   isActivatable: true,
      //   action: 'viewCal',
      // }),
      // new ButtonBlockItem({
      //   name: 'Mapa',
      //   isActivatable: true,
      //   action: 'viewMap',
      // }),
      // new ButtonBlockItem({
      //   name: 'Filtrar',
      //   isActivatable: true,
      //   align: 'right',
      //   action: 'filter',
      // }),
      new TabsItem({
        name: 'Buscar',
        isActivatable: true,
        align: 'right',
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
    name: 'sites',
    buttons: [
      new TabsItem({
        name: 'Galeria',
        action: 'viewGallery',
        isActivatable: true,
      }),
      new TabsItem({
        name: 'Listado',
        action: 'viewList',
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
    name: 'mediaAdmin',
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
];
