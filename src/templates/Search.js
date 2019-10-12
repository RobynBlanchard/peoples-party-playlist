import React from 'react';
import styled from 'styled-components';

import { Container } from '../globalStyles';
import SearchBar from '../components/SearchBar';
import Track from '../components/Track';
import AddButton from '../components/AddButton';
import TrackError from '../components/TrackError';
import LoadingIndicator from '../components/LoadingIndicator';

const Table = styled.table`
  width: 100%;
`;

const ButtonWrapper = styled.div`
  text-align: center;
`;

const Search = ({
  results,
  fetchSearchResults,
  addToPlaylist,
  trackError,
  loading
}) => {
  return (
    <Container>
      <SearchBar onSubmit={fetchSearchResults} loading={loading} />
      {loading && results.length === 0 ? (
        <LoadingIndicator />
      ) : (
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
                          <AddButton
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
      )}
    </Container>
  );
};

export default Search;
