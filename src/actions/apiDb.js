import axios from 'axios';
import {
  UPDATE_TRACK_IN_DB,
  UPDATE_TRACK_IN_DB_SUCCESS,
  UPDATE_TRACK_IN_DB_FAILURE,
  ADD_TRACK_TO_DB,
  ADD_TRACK_TO_DB_SUCCESS,
  ADD_TRACK_TO_DB_FAILURE
} from './types';

export const updateTrack = (uri, update) =>
  axios.patch(`/playlist/api/v1/tracks/${uri}`, { update });

export const addTrackToDb = (uri, name, artist, updatedAt) => {
  return axios.post('/playlist/api/v1/tracks', {
    uri,
    name,
    artist,
    updatedAt
  });
};

export const removeTrackFromDb = (uri, position) =>
  axios.delete(`/playlist/api/v1/tracks/${uri}`);
