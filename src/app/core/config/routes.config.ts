export const routesConfig: any = {
  account: '/account',
  accountEdit: '/account/edit',
  admin: '/admin/dashboard',
  artist: '/artists/:slug',
  artistAdmin: '/admin/artists/:id',
  artistAdminAdd: '/admin/artists/one',
  artists: '/artists',
  artistsAdmin: '/admin/artists',
  artistsFilter: '/artists?key=:filterKey&value=:filterValue',
  auth: '/auth',
  authLogin: '/auth/login',
  authForgottenPassword: '/auth/forgottenPassword',
  club: '/clubs/:slug',
  clubAdmin: '/admin/sites/clubs/:id',
  clubAdminAdd: '/admin/sites/clubs/one',
  clubs: '/clubs',
  clubsAdmin: '/admin/sites/clubs',
  clubsFilter: '/club?key=:filterKey&value=:filterValue',
  event: '/events/:slug',
  eventAdmin: '/admin/events/:id',
  events: '/events',
  eventsAdmin: '/admin/events',
  eventsFilter: '/events?key=:filterKey&value=:filterValue',
  festival: '/festivals/:slug',
  festivalAdmin: '/admin/sites/festivals/:id',
  festivalAdminAdd: '/admin/sites/festivals/one',
  festivals: '/festivals',
  festivalsAdmin: '/admin/sites/festivals',
  festivalsFilter: '/festivals?key=:filterKey&value=:filterValue',
  github: '/admin/github',
  home: '/',
  imageAdminAdd: '/admin/images/one',
  imagesAdmin: '/admin/images',
  login: '/login',
  register: '/register',
  set: '/sets/:slug',
  setAdmin: '/admin/media/sets/:id',
  setAdminAdd: '/admin/media/sets/new',
  setAdminAddData: '/admin/media/sets/new/:source/:value',
  sets: '/sets',
  setsAdmin: '/admin/media/sets',
  setsFilter: '/sets?key=:filterKey&value=:filterValue',
  styleAdmin: '/admin/styles/:id',
  styleAdminAdd: '/admin/styles/one',
  stylesAdmin: '/admin/styles',
  track: '/tracks/:slug',
  trackAdmin: '/admin/media/tracks/:id',
  trackAdminAdd: '/admin/media/tracks/new',
  trackAdminAddData: '/admin/media/tracks/new/:source/:value',
  tracks: '/tracks',
  tracksAdmin: '/admin/media/tracks',
  tracksFilter: '/tracks?key=:filterKey&value=:filterValue',
  userAdmin: '/admin/users/:id',
  usersAdmin: '/admin/users',
};
