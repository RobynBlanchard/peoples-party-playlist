import Playlist from './containers/playlist';
import Nav from './containers/nav';
import Search from './templates/Search';

export default [
  {
    path: '/playlist',
    component: Playlist,
    exact: true
  },
  {
    path: '/search',
    component: Search,
    exact: true
  },
  {
    path: '*',
    component: Nav,
    exact: true
  }
];
