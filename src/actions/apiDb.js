import axios from 'axios';

export const updateTrack = (uri, update) =>
  axios.patch(`/api/v1/playlist/tracks/${uri}`, { update });

export const addTrackToDb = (uri, name, artist, updatedAt) => {
  return axios.post('/api/v1/playlist/tracks', {
    uri,
    name,
    artist,
    updatedAt
  });
};

export const removeTrackFromDb = uri =>
  axios.delete(`/api/v1/playlist/tracks/${uri}`);
