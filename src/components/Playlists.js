import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import { fetchPlaylists, fetchUser, getUserAndPlayLists } from '../actions';

class Playlists extends React.Component {
  // componentDidMount() {
  //   const { userId, fetchUser, playlists, fetchPlaylists } = this.props;

  //   if (array === undefined || array.length == 0) {
  //     fetchPlaylists();
  //   }
  // }

  renderPlaylistNames() {
    return this.props.playlists.map(el => {
      return <h2>{el.name}</h2>;
    });
  }

  render() {
    const { userId, fetchUser, playlists } = this.props;
    // this.props.fetchPlaylists();
    // console.log('playlists----', playlists);
    // const playlistsTitles = playlists.map(el => {
    //   <h2>el.name</h2>;
    // });
    return (
      <div>
        <h2>Playlists</h2>
        {this.renderPlaylistNames()}
      </div>
    );
  }
}

// Playlists.serverFetch = fetchPlaylists;
Playlists.serverFetch = getUserAndPlayLists;

const mapStateToProps = state => {
  return {
    signedIn: state.auth.signedIn,
    userId: state.auth.userId,
    playlists: state.playlists.playlists
  };
};

export default connect(
  mapStateToProps,
  { fetchUser, fetchPlaylists, getUserAndPlayLists }
)(Playlists);
