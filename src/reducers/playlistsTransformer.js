const transformPlaylistData = (response) => {
  return response.tracks.items.map(el => {
    const artists = el.track.artists.map(el => el.name);
    return {
      uri: el.track.uri,
      votes: 0,
      name: el.track.name,
      artist: artists.join(','),
    }
  });
}

export default transformPlaylistData;