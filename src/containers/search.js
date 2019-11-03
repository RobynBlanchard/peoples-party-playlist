import React from 'react';
import { connect } from 'react-redux';

import { fetchSearchResults, addToPlaylist } from '../actions';
import ErrorIndicator from '../components/ErrorIndicator';
import requireAuth from '../components/RequireAuth';
import SearchTemplate from '../templates/Search';

class Search extends React.Component {
  render() {
    // console.log('render')
    const {
      loading,
      results,
      fetchSearchResults,
      fetchSearchResultsError,
      addToPlaylist,
      trackError
    } = this.props;

    if (fetchSearchResultsError)
      return (
        <ErrorIndicator message={fetchSearchResultsError.displayMessage} />
      );

    return (
      <SearchTemplate
        results={results}
        fetchSearchResults={fetchSearchResults}
        addToPlaylist={addToPlaylist}
        trackError={trackError}
        loading={loading}
      />
    );
  }
}

const mapStateTopProps = state => {
  return {
    results: state.search.results,
    addToPlaylistError: state.playlist.error,
    fetchSearchResultsError: state.search.error,
    loading: state.search.loading,
    trackError: state.search.trackError
  };
};

export default requireAuth(
  connect(
    mapStateTopProps,
    { fetchSearchResults, addToPlaylist }
  )(Search)
);
