import React from 'react';
import { connect } from 'react-redux';
import {
  fetchPlaylist,
  updateTrackNumOfVotes,
  resumePlayback,
  pausePlayback,
  getCurrentlyPlayingTrack,
  removeTrack,
  startSession,
  updateCurrentTrack,
  upVoteLimitExceeded,
  downVoteLimitExceeded
} from '../actions';
import requireAuth from '../components/RequireAuth';
import ErrorIndicator from '../components/ErrorIndicator';
import PlaylistTemplate from '../templates/Playlist';
class Playlist extends React.Component {
  componentDidMount() {
    const { playlist, fetchPlaylist } = this.props;
    const { tracks } = playlist;

    if (tracks.length === 0) {
      fetchPlaylist();
    }
  }

  componentWillReceiveProps(nextProps) {
    const { currentTrack, updateCurrentTrack, playing } = this.props;

    if (
      playing &&
      currentTrack.uri &&
      nextProps.currentTrack.uri !== currentTrack.uri
    ) {
      updateCurrentTrack();
    }
  }

  render() {
    const {
      playlist,
      playing,
      resumePlayback,
      pausePlayback,
      playbackError,
      session,
      updateTrackNumOfVotes,
      removeTrack,
      userId,
      upVoteLimitExceeded,
      downVoteLimitExceeded
    } = this.props;
    const { tracks, lockedTrack, error: playlistError, trackError } = playlist;
    const { error: sessionError } = session;

    let error = playlistError || playbackError || sessionError;

    if (error) return <ErrorIndicator message={error.displayMessage} />;

    if (tracks.length === 0 && lockedTrack.length === 0) {
      return null;
    }

    const playback = {
      playing,
      pausePlayback,
      resumePlayback
    };

    const playlistProp = {
      tracks: tracks,
      lockedTrack,
      trackError,
      updateTrackVotes: updateTrackNumOfVotes,
      removeTrack,
      userId,
      upVoteLimitExceeded,
      downVoteLimitExceeded
    };

    return (
      <PlaylistTemplate
        playlist={playlistProp}
        playback={playback}
        startSession={this.props.startSession}
        getCurrentlyPlayingTrack={this.props.getCurrentlyPlayingTrack}
      />
    );
  }
}

Playlist.serverFetch = fetchPlaylist;

const mapStateToProps = state => {
  return {
    playlist: state.playlist,
    playing: state.playback.playing,
    session: state.session,
    currentTrack: state.playback.currentTrack,
    playbackError: state.playback.error,
    userId: state.appUser.userId
  };
};

// export default requireAuth(
export default connect(mapStateToProps, {
  fetchPlaylist,
  removeTrack,
  updateTrackNumOfVotes,
  resumePlayback,
  pausePlayback,
  getCurrentlyPlayingTrack,
  startSession,
  updateCurrentTrack,
  upVoteLimitExceeded,
  downVoteLimitExceeded
})(Playlist);
