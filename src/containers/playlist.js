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

    // console.log('comp did mount')

    if (tracks.length === 0) {
      // debugger;
      // console.log('fetch-----------')
      // always fetch on did mount ?
      fetchPlaylist();
    }

    // const { session, getCurrentlyPlayingTrack } = this.props;
    // const { sessionStarted } = session;
    // console.log(session)

    // if (sessionStarted) {
    //   // getCurrentlyPlayingTrack();
    //   setInterval(() => getCurrentlyPlayingTrack(), 1000)
    // }

    // this.timer = setInterval(() => this.getCurrentlyPlaying(), 1000);
  }

  // getCurrentlyPlaying() {
  //   const { session, getCurrentlyPlayingTrack } = this.props;
  //   const { sessionStarted } = session;

  //   if (sessionStarted) {
  //     // c
  //     // TOOO: stop this if paused
  //     console.log('get cur plauing ++++++++')
  //     getCurrentlyPlayingTrack();
  //   }
  // }

  componentWillReceiveProps(nextProps) {
    
    const { currentTrack, updateCurrentTrack, session } = this.props;
    const { sessionStarted } = session;
    console.log(sessionStarted)

    if (
      sessionStarted &&
      currentTrack.uri &&
      nextProps.currentTrack.uri !== currentTrack.uri
    ) {
      // console.log('will receive props')
      console.log('update track!!!!!!!!!!!!!!!!!!!!!!!!!')

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
    // console.log('lcoked trackkkkk', lockedTrack)
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

    
    // console.log('render======')

    return <PlaylistTemplate playlist={playlistProp} playback={playback} session={session} startSession={this.props.startSession} getCurrentlyPlayingTrack={this.props.getCurrentlyPlayingTrack} />;
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
export default connect(
  mapStateToProps,
  {
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
  }
)(Playlist);
