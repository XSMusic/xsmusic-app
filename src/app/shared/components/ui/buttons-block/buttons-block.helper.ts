import { ButtonBlockItem } from './buttons-block.model';
export const buttonsByType = [
  {
    name: 'artists',
    buttons: [
      new ButtonBlockItem({
        name: 'Galeria',
        icon: 'gallery',
        isFirst: true,
        action: 'viewGallery',
      }),
      new ButtonBlockItem({
        name: 'Listado',
        icon: 'list',
        action: 'viewList',
      }),
      new ButtonBlockItem({
        name: 'Ordenar',
        icon: 'order',
        action: 'order',
      }),
      new ButtonBlockItem({
        name: 'Filtrar',
        icon: 'filter',
        action: 'filter',
      }),
      new ButtonBlockItem({
        name: 'Buscar',
        icon: 'search',
        isLast: true,
        action: 'search',
      }),
    ],
  },
  {
    name: 'artistsAdmin',
    buttons: [
      new ButtonBlockItem({
        name: 'Nuevo',
        icon: 'plus',
        isFirst: true,
        action: 'add',
      }),
      new ButtonBlockItem({
        name: 'Ordenar',
        icon: 'order',
        action: 'order',
      }),
      new ButtonBlockItem({
        name: 'Filtrar',
        icon: 'filter',
        action: 'filter',
      }),
      new ButtonBlockItem({
        name: 'Buscar',
        icon: 'search',
        isLast: true,
        action: 'search',
      }),
    ],
  },
  {
    name: 'artistAdmin',
    buttons: [
      new ButtonBlockItem({
        name: 'Info',
        icon: 'info',
        isFirst: true,
        isActivatable: true,
        action: 'viewInfo',
      }),
      new ButtonBlockItem({
        name: 'Opciones',
        icon: 'info',
        isActivatable: true,
        action: 'viewOptions',
      }),
      new ButtonBlockItem({
        name: 'Sesiones',
        icon: 'sets',
        isActivatable: true,
        action: 'viewSets',
      }),
      new ButtonBlockItem({
        name: 'Tracks',
        icon: 'info',
        isActivatable: true,
        action: 'viewTracks',
      }),
      new ButtonBlockItem({
        name: 'Events',
        icon: 'calendar',
        isActivatable: true,
        isLast: true,
        action: 'viewEvents',
      }),
    ],
  },
  {
    name: 'sites',
    buttons: [
      new ButtonBlockItem({
        name: 'Galeria',
        icon: 'gallery',
        isFirst: true,
        action: 'viewGallery',
      }),
      new ButtonBlockItem({
        name: 'Listado',
        icon: 'list',
        action: 'viewList',
      }),
      new ButtonBlockItem({
        name: 'Ordenar',
        icon: 'order',
        action: 'order',
      }),
      new ButtonBlockItem({
        name: 'Filtrar',
        icon: 'filter',
        action: 'filter',
      }),
      new ButtonBlockItem({
        name: 'Buscar',
        icon: 'search',
        isLast: true,
        action: 'search',
      }),
    ],
  },
  {
    name: 'sitesAdmin',
    buttons: [
      new ButtonBlockItem({
        name: 'Nuevo',
        icon: 'plus',
        isFirst: true,
        action: 'add',
      }),
      new ButtonBlockItem({
        name: 'Ordenar',
        icon: 'order',
        action: 'order',
      }),
      new ButtonBlockItem({
        name: 'Filtrar',
        icon: 'filter',
        action: 'filter',
      }),
      new ButtonBlockItem({
        name: 'Buscar',
        icon: 'search',
        isLast: true,
        action: 'search',
      }),
    ],
  },
  {
    name: 'siteAdmin',
    buttons: [
      new ButtonBlockItem({
        name: 'Info',
        icon: 'info',
        isFirst: true,
        isActivatable: true,
        action: 'viewInfo',
      }),
      new ButtonBlockItem({
        name: 'Opciones',
        icon: 'info',
        isActivatable: true,
        action: 'viewOptions',
      }),
      new ButtonBlockItem({
        name: 'Events',
        icon: 'calendar',
        isActivatable: true,
        isLast: true,
        action: 'viewEvents',
      }),
    ],
  },
  {
    name: 'mediaAdmin',
    buttons: [
      new ButtonBlockItem({
        name: 'Nuevo',
        icon: 'plus',
        isFirst: true,
        action: 'add',
      }),
      new ButtonBlockItem({
        name: 'Buscar',
        icon: 'search',
        isLast: true,
        action: 'search',
      }),
    ],
  },
  {
    name: 'styles',
    buttons: [
      new ButtonBlockItem({
        name: 'Nuevo',
        icon: 'plus',
        isFirst: true,
        action: 'add',
      }),
      new ButtonBlockItem({
        name: 'Buscar',
        icon: 'search',
        isLast: true,
        action: 'search',
      }),
    ],
  },
  {
    name: 'styleAdmin',
    buttons: [
      new ButtonBlockItem({
        name: 'Info',
        icon: 'info',
        isFirst: true,
        isActivatable: true,
        action: 'viewInfo',
      }),
      new ButtonBlockItem({
        name: 'Artistas',
        icon: 'info',
        isActivatable: true,
        action: 'viewArtists',
      }),
      new ButtonBlockItem({
        name: 'Sets',
        icon: 'info',
        isActivatable: true,
        action: 'viewSets',
      }),
      new ButtonBlockItem({
        name: 'Tracks',
        icon: 'info',
        isLast: true,
        isActivatable: true,
        action: 'viewTracks',
      }),
    ],
  },
];
