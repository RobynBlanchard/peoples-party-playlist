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
import Track from './Track';
import Heading from './Heading';
import Nav from  '../Nav';

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

class Playlist extends React.Component {
  componentDidMount() {
    if (this.props.playlist.length === 0) {
      this.props.fetchPlaylist();
    }
  }

  renderTracks() {
    if (this.props.playlist.length === 0) {
      return null;
    }
    let position = -1;
    return this.props.playlist.map(el => {
      position += 1;
      const { artist, name, votes, uri, id } = el;
      const locked = (position === 0 && this.props.playing);
      return (
        <Track
          locked={locked}
          artist={artist}
          song={name}
          votes={votes}
          id={id}
          uri={uri}
          upVoteAction={this.props.increaseVoteAndCheckForReOrder}
          downVoteAction={this.props.decreaseVoteAndCheckForReOrder}
          position={position}
          key={uri}
        />
      );
    });
  }

  render() {
    return (
      <Container>
        <Heading
          text={'Playlist'}
          playing={this.props.playing}
          playAction={this.props.play}
          pauseAction={this.props.pause}
        />
        <div>
          <ol>{this.renderTracks()}</ol>
        </div>
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
    pause,
  }
)(Playlist);
