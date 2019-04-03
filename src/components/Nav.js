import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import AuthButton from './AuthButton/AuthButton';
import { colours, constants } from '../styles.js';

const NavContainer = styled.div`
  margin: 0px;
  width: 100%;
  height: 50px;
  border-bottom: 1px solid #bbb;
  text-align: center;
  background-color: ${colours.grey};
`;

export const NavContentContainer = styled.div`
  width: ${constants.mainContentContainerWidth};
  display: inline-block;
`;

const List = styled.ul`
  list-style-type: none;
  margin: 0;
  padding: 0;
  overflow: hidden;
  height: 100%;
  border-left: 1px solid #bbb;

  & ${ListItem}:nth-child(3) {
    border-left: 1px solid #bbb;
    float: right;
  }
`;

const ListItem = styled.li`
  float: left;
  height: 100%;
  border-right: 1px solid #bbb;

  & > a {
    display: block;
    color: ${colours.spotifyWhite};
    text-align: center;
    padding: 16px 16px;
    text-decoration: none;
  }

  & > a:hover {
    background-color: ${colours.spotifyBlack};
    border-bottom: solid ${colours.spotifyBlack} 1px ;
  }

  & > a:active {
    color: grey;

  }
`;

const Nav = () => {
  return (
    <NavContainer>
      <NavContentContainer>
        <List>
          <ListItem>
            <Link to="/playlists">Playlists</Link>
          </ListItem>
          <ListItem>
            <Link to="/">Search</Link>
          </ListItem>
          <ListItem>
            <AuthButton />
          </ListItem>
        </List>
      </NavContentContainer>
    </NavContainer>
  );
};

export default Nav;
