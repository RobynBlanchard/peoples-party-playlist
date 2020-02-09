import React, { useState, useEffect } from 'react';
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
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 200);

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit(searchTerm);
  };

  const handleChange = e => {
    e.preventDefault();
    setSearchTerm(e.target.value);
  };

  useEffect(() => {
    if (debouncedSearchTerm) {
      onSubmit(debouncedSearchTerm);
    }
  }, [debouncedSearchTerm]);

  return (
    <Wrapper>
      <form onSubmit={handleSubmit}>
        <SearchInput
          type="text"
          value={searchTerm}
          onChange={handleChange}
          placeholder={'search by artist, song or album'}
        />
      </form>
    </Wrapper>
  );
};

export default SearchBar;
