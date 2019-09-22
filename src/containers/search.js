import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import { fetchSearchResults, addToPlaylist } from '../actions';
import Track from '../components/Track';
import CTAButton from '../components/CTAButton';
import SearchBar from '../components/SearchBar';
import ContentContainer from '../components/ContentContainer';
import LoadingIndicator from '../components/LoadingIndicator';
import ErrorIndicator from '../components/ErrorIndicator';
import requireAuth from './requireAuth';
import TrackError from '../components/TrackError';

const Table = styled.table`
  width: 100%;
`;

const ButtonWrapper = styled.div`
  text-align: center;
`;

class Search extends React.Component {
  renderSearchResults() {
    const {
      loading,
      results,
      fetchSearchResultsError,
      addToPlaylist,
      trackError
    } = this.props;

    if (fetchSearchResultsError)
      return (
        <ErrorIndicator message={fetchSearchResultsError.displayMessage} />
      );

    if (loading && results.length === 0) return <LoadingIndicator />;

    return (
      <Table>
        <tbody>
          {results &&
            results.map((result, index) => {
              const { name, artists, uri, loading, added } = result;
              if (loading)
                console.log(`adding track ${artists[0].name} - ${name}`);
              if (added) console.log(`added ${artists[0].name} - ${name}`);

              return (
                <React.Fragment key={uri}>
                  <Track name={name} artist={artists[0].name}>
                    {!added && (
                      <ButtonWrapper>
                        <CTAButton
                          handleClick={() =>
                            addToPlaylist(uri, name, artists[0].name, index)
                          }
                          name={name}
                          artist={artists[0].name}
                          uri={uri}
                          img={'add'}
                        />
                      </ButtonWrapper>
                    )}
                  </Track>

                  {trackError && trackError.position === index && (
                    <TrackError text={trackError.error.displayMessage} />
                  )}
                </React.Fragment>
              );
            })}
        </tbody>
      </Table>
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
