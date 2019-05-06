import React, { Component } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  text-align: center;
  margin-top: 8px;
  margin-bottom: 8px;
`;

const SearchInput = styled.input`
  width: 50vw;
  height: 24px;
  border: 1px solid grey;
  background-color: #87868614;
  border-radius: 24px;
  box-shadow: white;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 1);
  color: white;
  outline: none;
  padding: 8px 16px;

  &:focus-within {
    background-color: #ffffff45;
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
          />
        </form>
      </Wrapper>
    );
  }
}

export default SearchBar;
