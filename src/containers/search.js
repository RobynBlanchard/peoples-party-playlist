import React from 'react';
import { connect } from 'react-redux';

import { fetchSearchResults, addToPlaylist } from '../actions';
import Track from '../components/Track';
import CTAButton from '../components/CTAButton';
import SearchBar from '../components/SearchBar';
import ContentContainer from '../components/ContentContainer';
import LoadingIndicator from '../components/LoadingIndicator';
import ErrorIndicator from '../components/ErrorIndicator';
import requireAuth from './requireAuth';

class Search extends React.Component {
  renderSearchResults() {
    const {
      loading,
      results,
      fetchSearchResultsError,
      addToPlaylist
    } = this.props;

    if (fetchSearchResultsError) return <ErrorIndicator />;

    if (loading && results.length === 0) return <LoadingIndicator />;

    return (
      results &&
      results.map(result => {
        const { name, artists, uri } = result;
        return (
          <Track name={name} artist={artists[0].name} key={uri}>
            <CTAButton
              handleClick={addToPlaylist}
              name={name}
              artist={artists[0].name}
              uri={uri}
              img={'add'}
            />
          </Track>
        );
      })
    );
  }

  render() {
    const { fetchSearchResults } = this.props;

    return (
      <ContentContainer>
        <SearchBar onSubmit={fetchSearchResults} />
        {this.renderSearchResults()}
      </ContentContainer>
    );
  }
}

const mapStateTopProps = state => {
  return {
    results: state.search.results,
    addToPlaylistError: state.playlists.error,
    fetchSearchResultsError: state.search.error,
    loading: state.search.loading
  };
};

export default requireAuth(
  connect(
    mapStateTopProps,
    { fetchSearchResults, addToPlaylist }
  )(Search)
);
