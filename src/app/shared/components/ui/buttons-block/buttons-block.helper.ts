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
        action: 'order',
      }),
      new ButtonBlockItem({
        name: 'Filtrar',
        isActivatable: true,
        action: 'filter',
      }),
      new ButtonBlockItem({
        name: 'Buscar',
        isActivatable: true,
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
        action: 'add',
        isActivatable: false,
      }),
      new ButtonBlockItem({
        name: 'Ordenar',
        action: 'order',
      }),
      new ButtonBlockItem({
        name: 'Filtrar',
        action: 'filter',
      }),
      new ButtonBlockItem({
        name: 'Buscar',
        action: 'search',
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
        isActivatable: true,
      }),
      new ButtonBlockItem({
        name: 'Filtrar',
        action: 'filter',
        isActivatable: true,
      }),
      new ButtonBlockItem({
        name: 'Buscar',
        action: 'search',
        isActivatable: true,
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
        action: 'add',
        isActivatable: true,
      }),
      new ButtonBlockItem({
        name: 'Ordenar',
        action: 'order',
        isActivatable: true,
      }),
      new ButtonBlockItem({
        name: 'Filtrar',
        action: 'filter',
        isActivatable: true,
      }),
      new ButtonBlockItem({
        name: 'Buscar',
        action: 'search',
        isActivatable: true,
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
        action: 'add',
      }),
      new ButtonBlockItem({
        name: 'Buscar',
        action: 'search',
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
