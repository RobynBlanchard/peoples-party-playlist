import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { colours } from '../../../globalStyles';

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
    padding: 16px 12px;
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

const DropDownContent = styled.div`
  display: none;
  position: absolute;
  width: 130px;
  text-align: left;
  z-index: 1;
`;

const ListItemDropDown = styled(ListItem)`
  position: relative;

  &:hover {
    ${DropDownContent} {
      display: block;
    }
  }
`;

const ExternalLink = styled.a`
  color: inherit;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
  background-color: ${colours.spotifyBlack};

  &:hover {
    background-color: ${colours.primaryDark};
  }
`;

const Logo = styled.img`
  height: 20px;
  width: 20px;
  float: right;
`;

const Nav = ({ token, userId }) => {
  const renderProtectedRoutes = () => (
    <>
      <ListItem>
        <Link to="/playlist">Test Playlist</Link>
      </ListItem>
      <ListItem>
        <Link to="/search">Search</Link>
      </ListItem>
    </>
  );

  const renderAccount = () => (
    <>
      <Link to="#">{userId ? userId : 'Account'}</Link>
      <DropDownContent>
        <ExternalLink href="/change-user">Change user</ExternalLink>
        <ExternalLink href="/log-out">Log out</ExternalLink>
      </DropDownContent>
    </>
  );

  const renderLogIn = () => (
    <>
      <a href="/login">
        Log In&nbsp;
        <Logo src="/images/Spotify_Icon_RGB_Green.png" />
      </a>
    </>
  );

  return (
    <Container>
      <ContentWrapper>
        <List>
          <ListItem>
            <Link to="/">Home</Link>
          </ListItem>
          {token && renderProtectedRoutes()}
          <ListItemDropDown style={{ float: 'right' }}>
            {token ? renderAccount() : renderLogIn()}
          </ListItemDropDown>
        </List>
      </ContentWrapper>
    </Container>
  );
};

export default Nav;
