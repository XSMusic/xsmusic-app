import { TableHeaderItemI } from './table.interface';

export const itemsWithHeaders: TableHeaderItemI[] = [
  {
    name: 'artist',
    headers: [
      { name: '', key: 'image', type: 'image' },
      { name: 'Nombre', key: 'name', type: 'nameBirthdate', action: 'link' },
      { name: 'Pais', key: 'country', type: 'country', action: 'filter' },
      { name: 'Estilos', key: 'styles', type: 'styles', action: 'filter' },
      { name: 'S', key: 'sets', type: 'sets' },
      { name: 'T', key: 'tracks', type: 'tracks' },
      { name: 'E', key: 'events', type: 'events' },
      { name: 'L', key: 'likes', type: 'likes' },
      { name: 'Creado', key: 'created', type: 'date' },
      { name: 'Actualizado', key: 'updated', type: 'date' },
    ],
  },
  {
    name: 'event',
    headers: [
      { name: '', key: 'image', type: 'image' },
      { name: 'Nombre', key: 'name', type: 'name', action: 'link' },
      { name: 'Sitio', key: 'country', type: 'site', action: 'link' },
      { name: 'Estilos', key: 'styles', type: 'styles', action: 'filter' },
      { name: 'Fecha', key: 'date', type: 'dateTime', action: 'filter' },
      { name: 'Artistas', key: 'artists', type: 'artists', action: 'filter' },
      { name: 'Creado', key: 'created', type: 'date' },
      { name: 'Actualizado', key: 'updated', type: 'date' },
    ],
  },
  {
    name: 'club',
    headers: [
      { name: '', key: 'image', type: 'image' },
      { name: 'Nombre', key: 'name', type: 'nameAddress', action: 'link' },
      { name: 'Pais', key: 'country', type: 'countrySite', action: 'filter' },
      { name: 'Estilos', key: 'styles', type: 'styles', action: 'filter' },
      { name: 'S', key: 'sets', type: 'sets' },
      { name: 'E', key: 'events', type: 'events' },
      { name: 'L', key: 'likes', type: 'likes' },
      { name: 'Creado', key: 'created', type: 'date' },
      { name: 'Actualizado', key: 'updated', type: 'date' },
    ],
  },
  {
    name: 'festival',
    headers: [
      { name: '', key: 'image', type: 'image' },
      { name: 'Nombre', key: 'name', type: 'nameAddress', action: 'link' },
      { name: 'Pais', key: 'country', type: 'countrySite', action: 'filter' },
      { name: 'Estilos', key: 'styles', type: 'styles', action: 'filter' },
      { name: 'S', key: 'sets', type: 'sets' },
      { name: 'E', key: 'events', type: 'events' },
      { name: 'L', key: 'likes', type: 'likes' },
      { name: 'Creado', key: 'created', type: 'date' },
      { name: 'Actualizado', key: 'updated', type: 'date' },
    ],
  },
  {
    name: 'image',
    headers: [
      { name: '', key: 'image', type: 'image' },
      { name: 'Nombre', key: 'name', type: 'nameImage', action: 'link' },
      { name: 'Tipo', key: 'type', type: 'type', action: 'filter' },
      { name: 'Creado', key: 'created', type: 'date' },
    ],
  },
  {
    name: 'like',
    headers: [
      { name: 'Item', key: 'name', type: 'nameLike', action: 'link' },
      { name: 'Usuario', key: 'userlike', type: 'userlike', action: 'link' },
      { name: 'Creado', key: 'created', type: 'date' },
    ],
  },
  {
    name: 'set',
    headers: [
      { name: '', key: 'image', type: 'image' },
      { name: 'Nombre', key: 'name', type: 'nameArtists', action: 'link' },
      { name: 'Sitio', key: 'site', type: 'site', action: 'filter' },
      { name: 'Estilos', key: 'styles', type: 'styles', action: 'filter' },
      { name: 'L', key: 'likes', type: 'likes' },
      { name: 'Creado', key: 'created', type: 'date' },
      { name: 'Actualizado', key: 'updated', type: 'date' },
    ],
  },
  {
    name: 'style',
    headers: [
      { name: 'Nombre', key: 'name', type: 'name', action: 'link' },
      { name: 'Artistas', key: 'artists', type: 'artists' },
      { name: 'Sets', key: 'sets', type: 'sets' },
      { name: 'Eventos', key: 'events', type: 'events' },
      { name: 'Clubs', key: 'clubs', type: 'clubs' },
      { name: 'Festivales', key: 'festivals', type: 'festivals' },
    ],
  },
  {
    name: 'track',
    headers: [
      { name: '', key: 'image', type: 'image' },
      { name: 'Nombre', key: 'name', type: 'nameArtists', action: 'link' },
      { name: 'Estilos', key: 'styles', type: 'styles', action: 'filter' },
      { name: 'L', key: 'likes', type: 'likes' },
      { name: 'Creado', key: 'created', type: 'date' },
      { name: 'Actualizado', key: 'updated', type: 'date' },
    ],
  },
  {
    name: 'user',
    headers: [
      { name: '', key: 'image', type: 'image' },
      { name: 'Nombre', key: 'name', type: 'name', action: 'link' },
      { name: 'Email', key: 'email', type: 'normal' },
      { name: 'Rol', key: 'role', type: 'normal' },
      { name: 'Modo Oscuro', key: 'darkMode', type: 'normal' },
      { name: 'Ultimo Login', key: 'lastLogin', type: 'date' },
      { name: 'Registrado', key: 'created', type: 'date' },
      { name: 'Actualizado', key: 'updated', type: 'date' },
    ],
  },
];
