import React, { useState, useCallback, useEffect } from 'react';
import styled from 'styled-components';
import { colours, media } from '../../globalStyles';
import useDebounce from '../useDebounce';

const Wrapper = styled.div`
  text-align: center;
  margin: 8px 0;
`;

const SearchInput = styled.input`
  ${media.phone`width: 70vw;`}
  width: 50vw;
  height: 24px;
  border: 1px solid grey;
  border-radius: 24px;
  box-shadow: white;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 1);
  outline: none;
  padding: 8px 16px 8px 48px;
  font-size: 16px;
  color: white;
  background: url('images/search.svg') top left no-repeat;

  &:focus-within {
    background-color: ${colours.secondaryDark};
    color: ${colours.black};
  }
`;

const SearchBar = ({ onSubmit }) => {
  const [searchTerm, setSearchTerm] = useState(''); // store in redux ?
  const debouncedSearchTerm = useDebounce(null, searchTerm, 200);

  // console.log('searchTerm 1', searchTerm)
  // console.log('debouncedSearchTerm 1', debouncedSearchTerm)

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit(searchTerm)
  }

  const handleChange = e => {
    e.preventDefault();
    setSearchTerm(e.target.value)
  }

  useEffect(
    () => {
      // console.log('use effeect')
      // console.log('searchTerm', searchTerm)
      // console.log('debouncedSearchTerm', debouncedSearchTerm)

      if (debouncedSearchTerm) {
        // console.log('debounced search term3', debouncedSearchTerm)
        // dispatch loading ?
        // setIsSearching(true);
        onSubmit(debouncedSearchTerm)
        
      } else {
        // setResults([]);
      }
    },
    [debouncedSearchTerm] // Only call effect if debounced search term changes
  );

  return (
    <Wrapper>
      <form onSubmit={handleSubmit}>
        <SearchInput
          type="text"
          value={searchTerm}
          // onChange={handleSearchTermChange}
          onChange={handleChange}
          placeholder={'search by artist, song or album'}
        />
      </form>
    </Wrapper>
  );
};

export default SearchBar;
