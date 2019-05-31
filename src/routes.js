import Playlists from './components/Playlists';
import Playlist from './containers/playlist';
import AuthButton from './components/Nav/AuthButton';

export default [
  {
    path: '/',
    component: AuthButton,
    // exact: true
  },
  {
    path: '/playlists',
    component: Playlists,
    // exact: true
  },
  {
    path: '/playlist',
    component: Playlist,
    // exact: true
  }
];
