import React from 'react';
import { connect } from 'react-redux';

import { fetchSearchResults, addToPlaylist } from '../actions';
import Track from '../components/Track';
import CTAButton from '../components/CTAButton';
import SearchBar from '../components/SearchBar';
import ContentContainer from '../components/ContentContainer';
import LoadingIndicator from '../components/LoadingIndicator';
import ErrorIndicator from '../components/ErrorIndicator';

class Search extends React.Component {
  renderSearchResults() {
    const { loading, results, fetchSearchResultsError } = this.props;

    if (fetchSearchResultsError) return <ErrorIndicator />;

    if (loading && results.length === 0) return <LoadingIndicator />;

    return (
      results &&
      results.map(result => {
        return (
          <Track
            name={result.name}
            artist={result.artists[0].name}
            key={result.uri}
          >
            <CTAButton
              handleClick={this.props.addToPlaylist}
              name={result.name}
              artist={result.artists[0].name}
              uri={result.uri}
              img={'add'}
            />
          </Track>
        );
      })
    );
  }

  render() {
    return (
      <ContentContainer>
        <SearchBar onSubmit={this.props.fetchSearchResults} />
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

export default connect(
  mapStateTopProps,
  { fetchSearchResults, addToPlaylist }
)(Search);
