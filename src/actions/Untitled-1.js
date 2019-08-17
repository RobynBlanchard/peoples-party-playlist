// old platlist actions

const findPositionFromUri = uri => {
  return axios
    .get('/playlist/api/v1/tracks', {
      params: { removed: false, locked: false }
    })
    .then(resp => {
      if (resp.status === 200) {
        const index = resp.data.tracks.map(e => e.uri).indexOf(uri);
        return { index, updatedAt: resp.data.tracks[index].updatedAt };
      }
    });
};