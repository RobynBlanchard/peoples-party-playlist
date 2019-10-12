import React, { Component } from 'react';
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

class SearchBar extends Component {
  state = { searchTerm: '' };

  handleSearchTermChange = e => {
    this.setState({ searchTerm: e.target.value });
    this.props.onSubmit(e.target.value);
  };

  handleFormSubmit = e => {
    e.preventDefault();
    this.props.onSubmit(this.state.searchTerm);
  };

  render() {
    return (
      <Wrapper>
        <form onSubmit={this.handleFormSubmit}>
          <SearchInput
            type="text"
            value={this.state.searchTerm}
            onChange={this.handleSearchTermChange}
            placeholder={'search by artist, song or album'}
          />
        </form>
      </Wrapper>
    );
  }
}

export default SearchBar;
