import React from 'react';
import { connect } from 'react-redux';
import {
  fetchPlaylist,
  updateTrackNumOfVotes,
  pauseTrack,
  removeTrack,
  playTrack,
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
    const {
      currentTrack,
      updateCurrentTrack,
      playing,
      playlist: { lockedTrack, tracks },
      pauseTrack
    } = this.props;

    if (
      playing &&
      currentTrack.uri &&
      nextProps.currentTrack.uri !== currentTrack.uri &&
      lockedTrack.length > 0
    ) {
      return updateCurrentTrack();
    }

    const endOfPlaylistReached =
      playing && lockedTrack.length === 0 && tracks.length === 0;
    if (endOfPlaylistReached) {
      return pauseTrack();
    }
  }

  render() {
    const {
      playlist,
      playing,
      pauseTrack,
      playbackError,
      updateTrackNumOfVotes,
      removeTrack,
      appUser,
      upVoteLimitExceeded,
      downVoteLimitExceeded,
      playTrack
    } = this.props;

    const {
      tracks,
      lockedTrack,
      error: playlistError,
      lastClickedTrack
    } = playlist;

    let error = playlistError || playbackError;

    if (error) return <ErrorIndicator message={error.displayMessage} />;

    if (tracks.length === 0 && lockedTrack.length === 0) {
      return null;
    }

    const playback = {
      playing,
      pauseTrack
    };

    const playlistProp = {
      tracks: tracks,
      lockedTrack,
      lastClickedTrack,
      updateTrackVotes: updateTrackNumOfVotes,
      removeTrack,
      userId: appUser.userId,
      upVoteLimitExceeded,
      downVoteLimitExceeded
    };

    return (
      <PlaylistTemplate
        playlist={playlistProp}
        playback={playback}
        playTrack={playTrack}
      />
    );
  }
}

Playlist.serverFetch = fetchPlaylist;

const mapStateToProps = state => {
  return {
    playlist: state.playlist,
    playing: state.playback.playing,
    currentTrack: state.playback.currentTrack,
    playbackError: state.playback.error,
    appUser: state.appUser
  };
};

export default connect(mapStateToProps, {
  fetchPlaylist,
  removeTrack,
  updateTrackNumOfVotes,
  pauseTrack,
  playTrack,
  updateCurrentTrack,
  upVoteLimitExceeded,
  downVoteLimitExceeded
})(requireAuth(Playlist));
