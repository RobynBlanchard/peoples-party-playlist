import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import AuthButton from '../AuthButton';
import { colours } from '../../../styles/index.js';

const Container = styled.div`
  margin: 0px;
  width: 100%;
  height: 50px;
  border-bottom: 1px solid #bbb;
  text-align: center;
  background-color: ${colours.spotifyBlack};
  font-family: 'Lucida Sans Unicode', Lucida Grande, sans-serif;
`;

const ContentWrapper = styled.div`
  width: 80vw;
  display: inline-block;
  height: 100%;
  font-size: 16px;
  color: ${colours.spotifyWhite};
`;

const List = styled.ul`
  list-style-type: none;
  margin: 0;
  padding: 0;
  height: 100%;
  border-left: 1px solid #bbb;
`;

const ListItem = styled.li`
  float: left;
  height: 100%;
  border-right: 1px solid #bbb;
  position: relative;

  & > a {
    display: block;
    color: ${colours.spotifyWhite};
    text-align: center;
    padding: 16px 16px;
    text-decoration: none;
  }

  & > a:hover {
    background-color: ${colours.primaryLight};
    border-bottom: solid ${colours.spotifyBlack} 1px;
  }

  & > a:active {
    color: ${colours.secondaryLight};
  }
`;

const Nav = ({ colour, logo }) => {
  return (
    <Container>
      <ContentWrapper>
        <List>
          <ListItem>
            <Link to="/">Home</Link>
          </ListItem>
          <ListItem>
            <Link to="/playlist">Test Playlist</Link>
          </ListItem>
          <ListItem>
            <Link to="/search">Search</Link>
          </ListItem>
          <ListItem style={{ float: 'right' }}>
            <AuthButton />
          </ListItem>
        </List>
      </ContentWrapper>
    </Container>
  );
};

export default Nav;
