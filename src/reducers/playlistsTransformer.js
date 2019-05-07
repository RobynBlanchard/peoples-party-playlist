const transformPlaylistData = (response) => {
  const artists = response.track.artists.map(el => el.name);
  return {
    uri: response.track.uri,
    votes: 0,
    name: response.track.name,
    artist: artists.join(','),
  }
}

export default transformPlaylistData;