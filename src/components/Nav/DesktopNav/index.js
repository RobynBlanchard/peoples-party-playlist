import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import AuthButton from '../AuthButton';
import { colours } from '../../../styles';

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
`;

const ListItem = styled.li`
  float: left;
  height: 100%;
  position: relative;

  background: linear-gradient(
    to top,
    ${colours.primaryDark} 50%,
    ${colours.spotifyBlack} 50%
  );
  background-size: 200% 200%;
  background-position: top;
  transition: background 1s ease;

  & > a {
    display: block;
    color: ${colours.spotifyWhite};
    text-align: center;
    padding: 16px 16px;
    text-decoration: none;
  }

  &:hover {
    background-color: ${colours.primaryDark};
    border-bottom: solid ${colours.primaryDark} 1px;

    background-position: bottom;
  }

  & > a:active {
    color: ${colours.secondaryLight};
  }
`;

const Nav = ({ token }) => {
  const renderProtectedRoutes = () => {
    if (token) {
      return (
        <>
          <ListItem>
            <Link to="/playlist">Test Playlist</Link>
          </ListItem>
          <ListItem>
            <Link to="/search">Search</Link>
          </ListItem>
        </>
      );
    }
  };

  return (
    <Container>
      <ContentWrapper>
        <List>
          <ListItem>
            <Link to="/">Home</Link>
          </ListItem>
          {token && renderProtectedRoutes()}
          <ListItem style={{ float: 'right' }}>
            <AuthButton />
          </ListItem>
        </List>
      </ContentWrapper>
    </Container>
  );
};

export default Nav;
