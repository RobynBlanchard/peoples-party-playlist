import React from 'react';
import { connect } from 'react-redux';

import {
  fetchPlaylist,
  updateTrackNumOfVotes,
  resumePlayback,
  pausePlayback,
  getCurrentlyPlayingTrack,
  removeTrack,
  updateTrack,
  startSession,
  updateCurrentTrack
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

    if (playlist.playablePlaylist.length === 0) {
      fetchPlaylist();
    }
    this.timer = setInterval(() => this.getCurrentlyPlaying(), 1000);
  }

  getCurrentlyPlaying() {
    const { session, getCurrentlyPlayingTrack } = this.props;

    if (session.sessionStarted) {
      getCurrentlyPlayingTrack();
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { session, playing, startSession, currentTrack } = this.props;

    // do this in action instead?
    if (playing && !session.sessionStarted) startSession();

    // check for sessionStarted / lockedTrack.length > 0
    if (
      prevProps.currentTrack.uri &&
      prevProps.currentTrack.uri !== currentTrack.uri
    ) {
      this.props.updateCurrentTrack();
    }
  }

  renderCurrentlyPlaying(playing, track) {
    const { artist, name, uri } = track;

    return (
      <Track
        name={name}
        artist={artist}
        isLocked={true}
        shouldFocus={false}
        key={`${uri}-${name}`}
      >
        <Icon isPlaying={playing} />
      </Track>
    );
  }

  renderTracks(playlist) {
    const { session, updateTrackNumOfVotes, removeTrack } = this.props;

    return playlist.map((el, index) => {
      const { artist, name, votes, uri, updatedAt, error } = el;

      const fiveSecondsAgo = () => {
        const d = new Date();
        d.setSeconds(d.getSeconds() - 2);

        return d.toISOString();
      };

      if (error && error.displayMessage) {
        console.log('==track error==', error.displayMessage);
      }

      return (
        <Track
          name={name}
          artist={artist}
          isLocked={false}
          shouldFocus={updatedAt > fiveSecondsAgo()}
          key={`${uri}-${index}`}
        >
          <VoteDetails
            position={index}
            uri={uri}
            handleUpVote={updateTrackNumOfVotes}
            handleDownVote={updateTrackNumOfVotes}
            removeTrack={removeTrack}
            votes={votes}
            playlist={playlist}
            sessionStarted={session.sessionStarted}
          />
        </Track>
      );
    });
  }

  render() {
    const {
      playlist,
      playing,
      resumePlayback,
      pausePlayback,
      playbackError,
      session
    } = this.props;
    const { playablePlaylist, lockedTrack, error: playlistError } = playlist;
    const { error: sessionError } = session.sessionStarted;

    let error = playlistError || playbackError || sessionError;

    if (error) return <ErrorIndicator message={error.displayMessage} />;

    if (playablePlaylist.length === 0 && lockedTrack.length === 0) {
      return null;
    }

    return (
      <ContentContainer>
        <Heading
          text={'Party Playlist'}
          img={`images/${playing ? 'pause' : 'play'}-circle-regular.svg`}
          handleClick={playing ? pausePlayback : resumePlayback}
        />
        {lockedTrack.length !== 0 &&
          this.renderCurrentlyPlaying(playing, lockedTrack[0])}

        {this.renderTracks(playablePlaylist)}
      </ContentContainer>
    );
  }
}

Playlist.serverFetch = fetchPlaylist;

const mapStateToProps = state => {
  return {
    playlist: state.playlists,
    playing: state.playback.playing,
    session: state.session,
    currentTrack: state.playback.currentTrack,
    playbackError: state.playback.error
  };
};

// TODO:- put back
// export default requireAuth(connect(
export default connect(
  mapStateToProps,
  {
    fetchPlaylist,
    removeTrack,
    updateTrackNumOfVotes,
    resumePlayback,
    pausePlayback,
    getCurrentlyPlayingTrack,
    updateTrack,
    startSession,
    updateCurrentTrack
  }
)(Playlist);
