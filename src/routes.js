import Playlist from './containers/playlist';
import Nav from './containers/nav';

export default [
  {
    path: '/playlist',
    component: Playlist,
    exact: true
  },
  {
    path: '*',
    component: Nav,
    exact: true
  }
];
