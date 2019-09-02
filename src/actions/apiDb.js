import axios from 'axios';

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

export const removeTrackFromDb = uri =>
  axios.delete(`/playlist/api/v1/tracks/${uri}`);
