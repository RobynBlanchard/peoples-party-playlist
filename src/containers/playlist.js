import React from 'react';
import { connect } from 'react-redux';

import {
  fetchPlaylist,
  updateTrackNumOfVotes,
  resumePlayback,
  pausePlayback,
  getCurrentlyPlayingTrack,
  setRecentlyClicked,
  removeTrack,
  updateTrack
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

    // if socet connection closed then do this?
    // this.timer = setInterval(() => fetchPlaylist(), 3000);
  }

  getCurrentlyPlaying() {
    const {
      sessionStarted,
      getCurrentlyPlayingTrack,
      // currentTrack,
      playlist,
      removeTrack,
      updateTrack
    } = this.props;

    
    
    if (sessionStarted) {
      console.log('session started', sessionStarted)
      getCurrentlyPlayingTrack();
      // const topTrack = playlist.newPlalist[0].uri;
      // if (currentTrack.uri && currentTrack.uri !== topTrack) {
        // if locked true and not currently playing - remove track

        // for now just 'locking it'
        // updateTrack(topTrack, { removed: true });
        // should


        // remove(topTrack, 0);

        // ie remove
        // lockTrack(topTrack);
      // }
    }
  }

  // componentDidUpdate(prevProps, prevState) {
  //   Object.entries(this.props).forEach(([key, val]) => {
  //     prevProps[key] !== val && console.log(`Prop '${key}' changed`)
  //   }

  //   );
    // Object.entries(this.state).forEach(([key, val]) =>
    //   prevState[key] !== val && console.log(`State '${key}' changed`)
    // );
  // }

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
    const {
      playing,
      sessionStarted,
      recentlyClickedTrack,
      updateTrackNumOfVotes,
      setRecentlyClicked,
      lockTrack,
      // currentTrack
    } = this.props;


    let position = -1;
    return playlist.map(el => {


      position += 1;
      console.log(el)
      const { artist, name, votes, uri, updatedAt } = el;

      const fiveSecondsAgo = () => {
        const d = new Date();
        d.setSeconds(d.getSeconds() - 2);

        return d.toISOString();
      };

      return (
        <Track
          name={name}
          artist={artist}
          isLocked={false}
          shouldFocus={updatedAt > fiveSecondsAgo()}
          key={`${uri}-${position}`}
        >
          <VoteDetails
            position={position}
            uri={uri}
            handleUpVote={updateTrackNumOfVotes}
            setRecentlyClicked={setRecentlyClicked}
            handleDownVote={updateTrackNumOfVotes}
            votes={votes}
            shouldFocus={recentlyClickedTrack === uri}
            playlist={playlist}
            sessionStarted={sessionStarted}
          />
        </Track>
      );
    });
  }

// if session hasn't started
// play first track
// 


  render() {
    // console.log('render');
    const { playlist, playing, resumePlayback, pausePlayback } = this.props;

    // if currently playing
    // move currently playing to first element

    // if (this.props.currentTrack.uri) {
    //   // playlist.newPlalist.unshift(this.props.currentTrack)
    // }

    // const newPlaylist = playlist.filter(el => {
    //   !el.locked || ()
    // })
    // if (playlist.error) return  <ErrorIndicator />;

    // if (playlist.playlist.length === 0) {
    //   return null;
    // }

    // check if locked and create two sepearate arrays
    // for now just split from first index


    const lockedOne = playlist.newPlalist.filter(el => el.locked)
    const restOfList = playlist.newPlalist.filter(el => !el.locked)

    console.log('lockedOne', lockedOne)
    console.log('restOfList', restOfList)

    return (
      <ContentContainer>
        <Heading
          text={'Party Playlist'}
          img={`images/${playing ? 'pause' : 'play'}-circle-regular.svg`}
          handleClick={playing ? pausePlayback : resumePlayback}
        />
        {/* render only if changed uri */}
        {/* {this.props.currentTrack.uri && this.renderCurrentlyPlaying(playing, this.props.currentTrack)} */}
        {/* {this.renderTracks(playlist.newPlalist)} */}
        {lockedOne.length !== 0 && this.renderCurrentlyPlaying(playing, lockedOne[0])}

        {this.renderTracks(restOfList)}
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
    // currentlyPlaying: state.playback.currentPlayingTrack,
    currentTrack: state.playback.currentTrack,
    recentlyClickedTrack: state.recentlyClicked.recentlyClickedTrack
  };
};

// TODO:- put back
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
    setRecentlyClicked,
    updateTrack
  }
)(Playlist);
// );
