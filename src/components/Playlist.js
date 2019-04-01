import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import { fetchPlaylist, fetchUser } from '../actions';

class Playlist extends React.Component {

  componentDidMount() {
    const { userId, fetchUser, playlists, fetchPlaylist } = this.props;

    // if (array === undefined || array.length == 0) {
    //   fetchPlaylist();
    // }
    if (this.props.playlist === undefined) {
      this.props.fetchPlaylist()
    }
  }

  renderTracks() {
    return this.props.playlist.tracks.items.map(el => {
      return <h4>{el.track.name}</h4>
    })
  }

  // Object.keys(obj).length === 0;


  render() {
    const { userId, fetchUser, playlist } = this.props;

    return (
      <div>
        <h2>Playlist</h2>
        <h3>{playlist.name}</h3>
        {this.renderTracks()}
      </div>
    );
  }
}

Playlist.serverFetch = fetchPlaylist;

const mapStateToProps = state => {
  return {
    signedIn: state.auth.signedIn,
    userId: state.auth.userId,
    playlist: state.playlists.playlist
  };
};

export default connect(
  mapStateToProps,
  { fetchUser, fetchPlaylist }
)(Playlist);
