import React, { Component } from 'react'
import { connect } from 'react-redux';
import styled from 'styled-components';

import {
  fetchPlaylist,
  decreaseVoteAndCheckForReOrder,
  increaseVoteAndCheckForReOrder,
  play,
  pause,
} from '../../../actions';
// import Track from '../Track';
import Track from '../../Track';

class TracksContainer extends Component {
  getPlayBackState(position) {
    if (position === 0 && this.props.playing) {
      return 'playingAndlocked';
    } else if (this.props.sessionStarted && position === 0 && !this.props.playing) {
      return 'pausedAndLocked';
    } else {
      return undefined;
    }
  }

  render() {
    const { playlist } = this.props;

    if (playlist.length === 0) {
      return null;
    }

    let position = -1;
    return playlist.map(el => {
      position += 1;

      const { artist, name, votes, uri, id } = el;

      const trackDetails = {
        artist,
        name,
        votes,
        id,
        uri
      };

      return (
        <Track
          // playbackState={this.getPlayBackState(position)}
          // trackDetails={trackDetails}
          // upVoteAction={this.props.increaseVoteAndCheckForReOrder}
          // downVoteAction={this.props.decreaseVoteAndCheckForReOrder}
          position={position}
          id={trackDetails.id}
          uri={trackDetails.uri}
          // key={uri}
          song={trackDetails.name}
          artist={trackDetails.artist}
          votes={trackDetails.votes}
          trackDetails={trackDetails}
          handleUpVote={this.props.increaseVoteAndCheckForReOrder}
          handleDownVote={this.props.decreaseVoteAndCheckForReOrder}
          key={trackDetails.uri}
        />
      );
    });
  }
}

const mapStateToProps = state => {
  return {
    playlist: state.playlists.playlist,
    playing: state.playback.playing,
    sessionStarted: state.session.sessionStarted
  };
};

export default connect(
  mapStateToProps,
  {
    fetchPlaylist,
    decreaseVoteAndCheckForReOrder,
    increaseVoteAndCheckForReOrder,
    play,
    pause,
  }
)(TracksContainer);