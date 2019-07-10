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
import styled from 'styled-components';

const Tab = styled.button`
  border-radius: 20% 20% 0 0;
  display: inline-block;
  border: solid 1px white;
  padding: 8px 20px;
  outline: none;
  margin: 0;
  -webkit-text-decoration: none;
  text-decoration: none;
  background: #232323;
  color: #ffffff;
  font-family: inherit;
  font-size: 16px;
  cursor: pointer;
  text-align: center;
  -webkit-transition: background 250ms ease-in-out, -webkit-transform 150ms ease;
  -webkit-transition: background 250ms ease-in-out, transform 150ms ease;
  transition: background 250ms ease-in-out, transform 150ms ease;
  -webkit-appearance: none;
  -moz-appearance: none;
  border-bottom: none;
  margin: 8px 2px;

  &:active,
  :focus {
    background-color: black;
  }
`;

const TabWrapper = styled.div``;
class Search extends React.Component {
  state = { resultType: 'tracks' };
  renderSearchResults() {
    const { loading, results, fetchSearchResultsError } = this.props;

    if (fetchSearchResultsError) return <ErrorIndicator />;

    // if (loading && results.length === 0) return <LoadingIndicator />;
    console.log('results', results)
    // console.log('===================', this.state.resultType);
    const type = this.state.resultType;

    // const tracksTransformer = result => ({
    //   name: result.name,
    //   artist: result.artists[0].name,
    //   key: result.uri
    // });

    // const artistsTransformer = result => ({
    //   name: null,
    //   artist: result.name,
    //   key: result.uri,
    // })

    // const albumsTrans
    return (
      results &&
      results[type].items.map(result => {
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

  handleClick = (e, type) => {
    console.log('handle click');
    e.preventDefault();
    this.setState({ resultType: type });
  };

  render() {
    return (
      <ContentContainer>
        <SearchBar onSubmit={this.props.fetchSearchResults} />
        <TabWrapper>
          <Tab className="active" onClick={e => this.handleClick(e, 'tracks')}>
            Tracks
          </Tab>
          {/* <Tab onClick={e => this.handleClick(e, 'artists')}>Artists</Tab>
          <Tab onClick={e => this.handleClick(e, 'albums')}>Albums</Tab> */}
        </TabWrapper>
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
