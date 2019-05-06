import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import {
  fetchPlaylist,
  decreaseVoteAndCheckForReOrder,
  increaseVoteAndCheckForReOrder,
  play,
  pause
} from '../../actions';
import Heading from './Heading';
import Track from '../Track';
import { media } from '../../styles.js';

const Container = styled.div`
  width: 70%;
  ${media.desktop`width: 95%;`}
`;

import VoteDetails from './VoteDetails';
import Icon from './Icon';
class Playlist extends React.Component {
  componentDidMount() {
    if (this.props.playlist.length === 0) {
      this.props.fetchPlaylist();
    }
  }

  getPlayBackState() {
    if (this.props.playing) {
      return 'playingAndlocked';
    } else if (this.props.sessionStarted && !this.props.playing) {
      return 'pausedAndLocked';
    } else {
      return 'unlocked';
    }
  }

  renderTracks(playlist) {
    let position = -1;
    return playlist.map(el => {
      position += 1;

      const { artist, name, votes, uri, id } = el;

      let lockedStatus = undefined;
      if (position === 0) {
        lockedStatus = this.getPlayBackState();
      }

      const icon = lockedStatus === 'playingAndlocked' ? 'volume' : 'pause';
      const locked =
        lockedStatus === 'playingAndlocked' ||
        lockedStatus === 'pausedAndLocked';

      return (
        <Track
          name={name}
          artist={artist}
          lockedStatus={lockedStatus}
          key={uri}
        >
          {locked ? (
            <Icon img={icon} />
          ) : (
            <VoteDetails
              id={id}
              position={position}
              uri={uri}
              handleUpVote={this.props.increaseVoteAndCheckForReOrder}
              handleDownVote={this.props.decreaseVoteAndCheckForReOrder}
              votes={votes}
              lockedStatus={lockedStatus}
            />
          )}
        </Track>
      );
    });
  }

  render() {
    const { playlist, playing, play, pause } = this.props;

    if (playlist.length === 0) {
      return null;
    }

    return (
      <Container>
        <Heading
          text={'Playlist'}
          img={`images/${playing ? 'pause' : 'play'}-circle-regular.svg`}
          handleClick={playing ? pause : play}
        />
        {this.renderTracks(playlist)}
      </Container>
    );
  }
}

Playlist.serverFetch = fetchPlaylist;

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
    pause
  }
)(Playlist);
