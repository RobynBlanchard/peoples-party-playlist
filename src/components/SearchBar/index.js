import React, { useState } from 'react';
import styled from 'styled-components';
import { colours, media } from '../../globalStyles';

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

  const handleSearchTermChange = e => {
    setSearchTerm(e.target.value);
    onSubmit(e.target.value);
  };

  const handleFormSubmit = e => {
    e.preventDefault();
    onSubmit(searchTerm);
  };

  return (
    <Wrapper>
      <form onSubmit={handleFormSubmit}>
        <SearchInput
          type="text"
          value={searchTerm}
          onChange={handleSearchTermChange}
          placeholder={'search by artist, song or album'}
        />
      </form>
    </Wrapper>
  );
};

export default SearchBar;
