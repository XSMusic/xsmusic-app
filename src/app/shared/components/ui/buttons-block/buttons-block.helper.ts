import { ButtonBlockItem } from './buttons-block.model';
export const buttonsByType = [
  {
    name: 'generic',
    buttons: [
      new ButtonBlockItem({
        name: 'Galeria',
        isActivatable: true,
        action: 'viewGallery',
      }),
      new ButtonBlockItem({
        name: 'Listado',
        isActivatable: true,
        action: 'viewList',
      }),
      new ButtonBlockItem({
        name: 'Ordenar',
        isActivatable: true,
        align: 'right',
        action: 'order',
      }),
      new ButtonBlockItem({
        name: 'Filtrar',
        isActivatable: true,
        align: 'right',
        action: 'filter',
      }),
      new ButtonBlockItem({
        name: 'Buscar',
        isActivatable: true,
        align: 'right',
        action: 'search',
      }),
    ],
  },
  {
    name: 'artistsAdmin',
    buttons: [
      new ButtonBlockItem({
        name: 'Listado',
        action: 'viewList',
        isActivatable: true,
      }),
      new ButtonBlockItem({
        name: 'Nuevo',
        action: 'viewAdd',
        isActivatable: true,
      }),
      new ButtonBlockItem({
        name: 'Ordenar',
        action: 'order',
        align: 'right',
      }),
      new ButtonBlockItem({
        name: 'Filtrar',
        action: 'filter',
        align: 'right',
      }),
      new ButtonBlockItem({
        name: 'Buscar',
        action: 'search',
        align: 'right',
      }),
    ],
  },
  {
    name: 'artistAdmin',
    buttons: [
      new ButtonBlockItem({
        name: 'Info',
        isActivatable: true,
        action: 'viewInfo',
      }),
      new ButtonBlockItem({
        name: 'Opciones',
        isActivatable: true,
        action: 'viewOptions',
      }),
      new ButtonBlockItem({
        name: 'Sesiones',
        isActivatable: true,
        action: 'viewSets',
      }),
      new ButtonBlockItem({
        name: 'Tracks',
        isActivatable: true,
        action: 'viewTracks',
      }),
      new ButtonBlockItem({
        name: 'Eventos',
        isActivatable: true,
        action: 'viewEvents',
      }),
    ],
  },
  {
    name: 'eventsAdmin',
    buttons: [
      new ButtonBlockItem({
        name: 'Listado',
        action: 'viewList',
        isActivatable: true,
      }),
      new ButtonBlockItem({
        name: 'Nuevo',
        action: 'viewAdd',
        isActivatable: true,
      }),
      new ButtonBlockItem({
        name: 'Ordenar',
        action: 'order',
        align: 'right',
      }),
      new ButtonBlockItem({
        name: 'Filtrar',
        action: 'filter',
        align: 'right',
      }),
      new ButtonBlockItem({
        name: 'Buscar',
        action: 'search',
        align: 'right',
      }),
    ],
  },
  {
    name: 'eventAdmin',
    buttons: [
      new ButtonBlockItem({
        name: 'Info',
        isActivatable: true,
        action: 'viewInfo',
      }),
      new ButtonBlockItem({
        name: 'Opciones',
        isActivatable: true,
        action: 'viewOptions',
      }),
    ],
  },
  {
    name: 'sites',
    buttons: [
      new ButtonBlockItem({
        name: 'Galeria',
        action: 'viewGallery',
        isActivatable: true,
      }),
      new ButtonBlockItem({
        name: 'Listado',
        action: 'viewList',
        isActivatable: true,
      }),
      new ButtonBlockItem({
        name: 'Mapa',
        action: 'viewMap',
        isActivatable: true,
      }),
      new ButtonBlockItem({
        name: 'Ordenar',
        action: 'order',
        align: 'right',
      }),
      new ButtonBlockItem({
        name: 'Filtrar',
        action: 'filter',
        align: 'right',
      }),
      new ButtonBlockItem({
        name: 'Buscar',
        action: 'search',
        align: 'right',
      }),
    ],
  },
  {
    name: 'sitesAdmin',
    buttons: [
      new ButtonBlockItem({
        name: 'Listado',
        action: 'viewList',
        isActivatable: true,
      }),
      new ButtonBlockItem({
        name: 'Nuevo',
        action: 'viewAdd',
        isActivatable: true,
      }),
      new ButtonBlockItem({
        name: 'Ordenar',
        action: 'order',
        align: 'right',
      }),
      new ButtonBlockItem({
        name: 'Filtrar',
        action: 'filter',
        align: 'right',
      }),
      new ButtonBlockItem({
        name: 'Buscar',
        action: 'search',
        align: 'right',
      }),
    ],
  },
  {
    name: 'siteAdmin',
    buttons: [
      new ButtonBlockItem({
        name: 'Info',
        isActivatable: true,
        action: 'viewInfo',
      }),
      new ButtonBlockItem({
        name: 'Opciones',
        isActivatable: true,
        action: 'viewOptions',
      }),
      new ButtonBlockItem({
        name: 'Eventos',
        isActivatable: true,
        action: 'viewEvents',
      }),
      new ButtonBlockItem({
        name: 'Sets',
        isActivatable: true,
        action: 'viewEvents',
      }),
    ],
  },
  {
    name: 'mediaAdmin',
    buttons: [
      new ButtonBlockItem({
        name: 'Listado',
        action: 'viewList',
        isActivatable: true,
      }),
      new ButtonBlockItem({
        name: 'Nuevo',
        action: 'viewAdd',
        isActivatable: true,
      }),
      new ButtonBlockItem({
        name: 'Ordenar',
        action: 'order',
        align: 'right',
      }),
      new ButtonBlockItem({
        name: 'Filtrar',
        action: 'filter',
        align: 'right',
      }),
      new ButtonBlockItem({
        name: 'Buscar',
        action: 'search',
        align: 'right',
      }),
    ],
  },
  {
    name: 'styles',
    buttons: [
      new ButtonBlockItem({
        name: 'Nuevo',
        action: 'add',
      }),
      new ButtonBlockItem({
        name: 'Buscar',
        action: 'search',
      }),
    ],
  },
  {
    name: 'styleAdmin',
    buttons: [
      new ButtonBlockItem({
        name: 'Info',
        isActivatable: true,
        action: 'viewInfo',
      }),
      new ButtonBlockItem({
        name: 'Artistas',
        isActivatable: true,
        action: 'viewArtists',
      }),
      new ButtonBlockItem({
        name: 'Sets',
        isActivatable: true,
        action: 'viewSets',
      }),
      new ButtonBlockItem({
        name: 'Tracks',
        isActivatable: true,
        action: 'viewTracks',
      }),
      new ButtonBlockItem({
        name: 'Clubs',
        isActivatable: true,
        action: 'viewClubs',
      }),
      new ButtonBlockItem({
        name: 'Festivales',
        isActivatable: true,
        action: 'viewFestivals',
      }),
    ],
  },
];
