import { SET_RECENTLY_CLICKED } from './types';

export const setRecentlyClicked = (uri) => {
  return {
    type: SET_RECENTLY_CLICKED,
    payload: uri
  }
};