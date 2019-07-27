import Playlists from './containers/playlists';
import Playlist from './containers/playlist';
import Nav from './containers/nav';

export default [
  {
    path: '/playlists',
    component: Playlists,
    // exact: true
  },
  {
    path: '/playlist',
    component: Playlist,
    // exact: true
  },
  {
    path: '*',
    component: Nav,
    // exact: true
  }
];
