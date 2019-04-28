import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

import {
  fetchSearchResults
  } from '../../actions';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const SearchBar = styled.input`
    // width: 100%;
    // min-width: 800px;
    width 50vw;
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

    background: url("http://localhost:3000/images/search.svg") top left no-repeat;
    // height: 12px;
    padding-left: 48px;
    
`
const Container = styled.div`
  border-bottom: solid 1px #333333;
  width: 920px;
  height: 50px;
  margin: 5px;

  display: flex;
  justify-content: space-between;
`

const Details = styled.div`
  width: 100%;
  height: 100%;
  padding: 0 10px;
`

const TopContent = styled.div`
  text-align: center;
  margin-top: 8px;
`
const VotesContainer = styled.div`
  width: 100px;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;
const Icon = styled.img`
  height: 20px;
  width: 20px;
`;
class Search extends React.Component {
  state = { searchTerm: '' }

  searchTermChange = e => {
    console.log(e.target.value);
    this.props.fetchSearchResults(e.target.value)
    this.setState({searchTerm: e.target.value});
  }

  onFormSubmit = e => {

      e.preventDefault();
      console.log(this.state.searchTerm)
      // console.log(input.textContent)
      this.props.fetchSearchResults(this.state.searchTerm)
    }

  renderResults() {
    console.log(this.props.results)
    return this.props.results.map(result => {
      return (
        <Container>
          
        <Details>
        <p>{result.artists[0].name + ' - ' + result.name}</p>
          </Details>
          <VotesContainer>
          <Icon src="http://localhost:3000/images/add.svg" />
          </VotesContainer>
        </Container>
      )
    })
  }

  render() {
    return (
      <Wrapper>
                  <TopContent>
                  <form onSubmit={this.onFormSubmit} >
                  {/* <Icon src="http://localhost:3000/images/search.svg" /> */}
        <SearchBar type="text" value={this.state.searchTerm} onChange={this.searchTermChange}/>
            </form>
            </TopContent>


            {this.renderResults()}
      </Wrapper>
    );
  }
}

const mapStateTopProps = state => {
  return {
    results: state.search.results
  }
}


export default connect(mapStateTopProps, {fetchSearchResults})(Search);