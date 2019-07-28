import React from 'react';
import { connect } from 'react-redux';

import {
  fetchPlaylist,
  handleVoteDecrease,
  handleVoteIncrease,
  resumePlayback,
  pausePlayback,
  getCurrentlyPlayingTrack,
  setRecentlyClicked,
  removeTrack
} from '../actions';
import Heading from '../components/Heading';
import Track from '../components/Track';
import VoteDetails from '../components/VoteDetails';
import Icon from '../components/Icon';
import ContentContainer from '../components/ContentContainer';
import requireAuth from './requireAuth';
import ErrorIndicator from '../components/ErrorIndicator';

class Playlist extends React.Component {
  componentDidMount() {
    const { playlist, fetchPlaylist } = this.props;

    if (playlist.playlist.length === 0) {
      fetchPlaylist();
    }
    this.timer = setInterval(() => this.getCurrentlyPlaying(), 1000);
  }

  getCurrentlyPlaying() {
    const {
      sessionStarted,
      getCurrentlyPlayingTrack,
      currentTrack,
      playlist,
      removeTrack
    } = this.props;

    if (sessionStarted) {
      getCurrentlyPlayingTrack();

      const topTrack = playlist.playlist[0].uri;
      if (currentTrack.uri && currentTrack.uri !== topTrack) {
        removeTrack(topTrack, 0);
      }
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
        isLocked = playing || (sessionStarted && !playing);
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
              playlist={playlist}
              sessionStarted={sessionStarted}
            />
          )}
        </Track>
      );
    });
  }

  render() {
    const { playlist, playing, resumePlayback, pausePlayback } = this.props;
    console.log('playkst', playlist)
    if (playlist.error) return  <ErrorIndicator />;

    if (playlist.playlist.length === 0) {
      return null;
    }

    return (
      <ContentContainer>
        <Heading
          text={'Party Playlist'}
          img={`images/${playing ? 'pause' : 'play'}-circle-regular.svg`}
          handleClick={playing ? pausePlayback : resumePlayback}
        />
        {this.renderTracks(playlist.playlist)}
      </ContentContainer>
    );
  }
}

Playlist.serverFetch = fetchPlaylist;

const mapStateToProps = state => {
  return {
    playlist: state.playlists,
    playing: state.playback.playing,
    sessionStarted: state.session.sessionStarted,
    currentlyPlaying: state.playback.currentPlayingTrack,
    currentTrack: state.playback.currentTrack,
    recentlyClickedTrack: state.recentlyClicked.recentlyClickedTrack
  };
};

export default requireAuth(
  connect(
    mapStateToProps,
    {
      fetchPlaylist,
      removeTrack,
      handleVoteDecrease,
      handleVoteIncrease,
      resumePlayback,
      pausePlayback,
      getCurrentlyPlayingTrack,
      setRecentlyClicked
    }
  )(Playlist)
);
