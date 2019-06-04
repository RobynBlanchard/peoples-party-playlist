import React from 'react';
import { connect } from 'react-redux';

import { fetchSearchResults, addToPlaylist } from '../actions';
import Track from '../components/Track';
import CTAButton from '../components/CTAButton';
import SearchBar from '../components/SearchBar';
import ContentContainer from '../components/ContentContainer';

class Search extends React.Component {
  renderSearchResults() {
    return this.props.results && this.props.results.map(result => {
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
    });
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
    results: state.search.results
  };
};

export default connect(
  mapStateTopProps,
  { fetchSearchResults, addToPlaylist }
)(Search);
