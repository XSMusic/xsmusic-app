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
        name: 'Ordenar',
        icon: 'order',
        isFirst: true,
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
];
