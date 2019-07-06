import React, { Component } from 'react';
import styled from 'styled-components';
import { colours } from '../../styles';

const Wrapper = styled.div`
  text-align: center;
  margin-top: 8px;
  margin-bottom: 8px;
`;

const SearchInput = styled.input`
  width: 50vw;
  height: 24px;
  border: 1px solid grey;
  border-radius: 24px;
  box-shadow: white;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 1);
  outline: none;
  padding: 8px 16px;
  font-size: 16px;
  color: white;


  &:focus-within {
    background-color: ${colours.secondaryDark};
    color: ${colours.black};

  }

  background: url('images/search.svg') top left no-repeat;
  padding-left: 48px;
`;

class SearchBar extends Component {
  state = { searchTerm: '' };

  searchTermChange = e => {
    this.props.onSubmit(e.target.value);
    this.setState({ searchTerm: e.target.value });
  };

  onFormSubmit = e => {
    e.preventDefault();
    this.props.onSubmit(this.state.searchTerm);
  };

  render() {
    return (
      <Wrapper>
        <form onSubmit={this.onFormSubmit}>
          <SearchInput
            type="text"
            value={this.state.searchTerm}
            onChange={this.searchTermChange}
            placeholder={"search for an artist, song or album"}
          />
        </form>
      </Wrapper>
    );
  }
}

export default SearchBar;
