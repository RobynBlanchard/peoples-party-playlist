import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import {
  fetchPlaylist,
  handleVoteDecrease,
  handleVoteIncrease,
  resumePlayback,
  pausePlayback,
  getCurrentlyPlayingTrack,
  setRecentlyClicked
} from '../../actions';
import Heading from './Heading';
import Track from '../Track';
import VoteDetails from './VoteDetails';
import Icon from './Icon';
import { media } from '../../styles';

const Container = styled.div`
  width: 70%;
  ${media.desktop`width: 95%;`}
`;

class Playlist extends React.Component {
  componentDidMount() {
    const { playlist, fetchPlaylist } = this.props;

    if (playlist.length === 0) {
      fetchPlaylist();
    }
    this.timer = setInterval(() => this.getCurrentlyPlaying(), 1000);
  }

  getCurrentlyPlaying() {
    const { sessionStarted, getCurrentlyPlayingTrack } = this.props;

    if (sessionStarted) {
      getCurrentlyPlayingTrack();
    }
  }

  renderTracks(playlist) {
    const {
      playing,
      sessionStarted,
      recentlyClickedTrack,
      handleVoteIncrease,
      setRecentlyClicked,
      handleVoteDecrease
    } = this.props;

    let position = -1;
    return playlist.map(el => {
      position += 1;

      const { artist, name, votes, uri } = el;

      let isLocked;

      if (position === 0) {
        isLocked =
          playing ||
          (sessionStarted && !playing);
      }

      return (
        <Track
          name={name}
          artist={artist}
          isLocked={isLocked}
          shouldFocus={recentlyClickedTrack === uri}
          key={`${uri}-${position}`}
        >
          {isLocked ? (
            <Icon isPlaying={playing} />
          ) : (
            <VoteDetails
              position={position}
              uri={uri}
              handleUpVote={handleVoteIncrease}
              setRecentlyClicked={setRecentlyClicked}
              handleDownVote={handleVoteDecrease}
              votes={votes}
              shouldFocus={recentlyClickedTrack === uri}
            />
          )}
        </Track>
      );
    });
  }

  render() {
    const { playlist, playing, resumePlayback, pausePlayback } = this.props;

    if (playlist.length === 0) {
      return null;
    }

    return (
      <Container>
        <Heading
          text={'Party Playlist'}
          img={`images/${playing ? 'pause' : 'play'}-circle-regular.svg`}
          handleClick={playing ? pausePlayback : resumePlayback}
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
    sessionStarted: state.session.sessionStarted,
    currentlyPlaying: state.playback.currentPlayingTrack,
    recentlyClickedTrack: state.recentlyClicked.recentlyClickedTrack
  };
};

export default connect(
  mapStateToProps,
  {
    fetchPlaylist,
    handleVoteDecrease,
    handleVoteIncrease,
    resumePlayback,
    pausePlayback,
    getCurrentlyPlayingTrack,
    setRecentlyClicked
  }
)(Playlist);
