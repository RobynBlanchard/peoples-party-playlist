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
import { media } from '../../styles/index.js';

const Container = styled.div`
  width: 70%;
  ${media.desktop`width: 95%;`}
`;

class Playlist extends React.Component {
  componentDidMount() {
    if (this.props.playlist.length === 0) {
      this.props.fetchPlaylist();
    }
    this.timer = setInterval(() => this.getCurrentlyPlaying(), 1000);
  }

  getCurrentlyPlaying() {
    if (this.props.sessionStarted) {
      this.props.getCurrentlyPlayingTrack();
    }
  }

  renderTracks(playlist) {
    let position = -1;
    return playlist.map(el => {
      position += 1;

      const { artist, name, votes, uri } = el;

      let isLocked;

      if (position === 0) {
        isLocked =
          this.props.playing ||
          (this.props.sessionStarted && !this.props.playing);
      }

      return (
        <Track
          name={name}
          artist={artist}
          isLocked={isLocked}
          shouldFocus={this.props.recentlyClickedTrack === uri}
          key={`${uri}-${position}`}
        >
          {isLocked ? (
            <Icon isPlaying={this.props.playing} />
          ) : (
            <VoteDetails
              position={position}
              uri={uri}
              handleUpVote={this.props.handleVoteIncrease}
              setRecentlyClicked={this.props.setRecentlyClicked}
              handleDownVote={this.props.handleVoteDecrease}
              votes={votes}
              shouldFocus={this.props.recentlyClickedTrack === uri}
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
