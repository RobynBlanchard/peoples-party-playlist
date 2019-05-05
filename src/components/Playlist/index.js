import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { media } from '../../styles.js';

import {
  fetchPlaylist,
  decreaseVoteAndCheckForReOrder,
  increaseVoteAndCheckForReOrder,
  play,
  pause
} from '../../actions';
import Heading from './Heading';
import TracksContainer from './TracksContainer';
import Track from '../Track';

import TrackGrid from '../Track';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;

`;

const Wrapper = styled.div`
  width: 70%;
  ${media.desktop`width: 95%;`}

`

class Playlist extends React.Component {
  componentDidMount() {
    if (this.props.playlist.length === 0) {
      this.props.fetchPlaylist();
    }
  }

  render() {
    return (
      <Container>
        <Wrapper>

        <Heading
          text={'Playlist'}
          playing={this.props.playing}
          playAction={this.props.play}
          pauseAction={this.props.pause}
        />
        <div>
          <TracksContainer
            playlist={this.props.playlist}
            playing={this.props.playing}
          />
          <Track song={'American Idiot'} artist={'Green day'} votes={'5'} />
          <Track song={'In my Arms - Original Mix'} artist={'Mano Le Tough'} votes={'5'} />
          <Track song={'It must be love'} artist={'Madness'} votes={'5'} />

        </div>
        </Wrapper>
      </Container>
    );
  }
}

Playlist.serverFetch = fetchPlaylist;

const mapStateToProps = state => {
  return {
    playlist: state.playlists.playlist,
    playing: state.playback.playing
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
