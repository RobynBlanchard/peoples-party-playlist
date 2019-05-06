import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

import { fetchSearchResults, addToPlaylist } from '../../actions';
import { media } from '../../styles.js';
import Track from '../Track';
import CTAButton from './CTAButton';
import SearchBar from './SearchBar';

const Container = styled.div`
  width: 70%;
  ${media.desktop`width: 95%;`}
`;

class Search extends React.Component {
  renderSearchResults() {
    return this.props.results.map(result => {
      return (
        <Track
          name={result.name}
          artist={result.artists[0].name}
          key={result.id}
        >
          <CTAButton
            handleClick={this.props.addToPlaylist}
            uri={result.uri}
            img={'add'}
          />
        </Track>
      );
    });
  }

  render() {
    return (
      <Container>
        <SearchBar onSubmit={this.props.fetchSearchResults} />
        {this.renderSearchResults()}
      </Container>
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
