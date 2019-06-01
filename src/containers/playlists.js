import React from 'react';
import { connect } from 'react-redux';

import { fetchPlaylists, fetchUser, getUserAndPlayLists } from '../actions';

class Playlists extends React.Component {
  renderPlaylistNames() {
    return this.props.playlists.map(el => {
      return <h2>{el.name}</h2>;
    });
  }

  render() {
    // const { userId, fetchUser, playlists } = this.props;
    return (
      <div>
        <h2>Playlists</h2>
        {this.renderPlaylistNames()}
      </div>
    );
  }
}

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
