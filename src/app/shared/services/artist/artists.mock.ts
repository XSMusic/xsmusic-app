import { Artist } from '../../models/artist.model';
export const artistMock: Artist[] = [
  new Artist({
    _id: '1',
    name: 'DJ Nano',
    image:
      'https://e00-elmundo.uecdn.es/assets/multimedia/imagenes/2021/08/05/16281648599708.jpg',
    styles: ['Dance', 'House'],
    created: '2022-10-13 22:22',
    updated: '2022-10-13 22:22',
  }),
  new Artist({
    _id: '2',
    name: 'Carl Cox',
    image: 'https://media.resources.festicket.com/www/artists/carlcox-2018.jpg',
    country: 'us',
    styles: ['House', 'Tech-House', 'Techno'],
    created: '2022-10-13 22:22',
    updated: '2022-10-13 22:22',
  }),
  new Artist({
    name: 'David Guetta',
    image: 'https://media.resources.festicket.com/www/artists/DavidGuetta.jpg',
    country: 'fr',
    styles: ['House', 'Dance'],
    created: '2022-10-13 22:22',
  }),
  new Artist({
    name: 'Tiësto',
    image: 'https://i.scdn.co/image/ab6761610000e5eb8cb651b2e77c6d30b1de15e4',
    country: 'nl',
    styles: ['Trance'],
    updated: '2022-10-13 22:22',
  }),
  new Artist({
    name: 'Prueba 2',
    image:
      'https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    created: '2022-10-13 22:22',
  }),
  new Artist({
    name: 'Prueba 3',
    image:
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    updated: '2022-10-13 22:22',
  }),
];
