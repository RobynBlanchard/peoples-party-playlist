import React from 'react';
import styled, { keyframes, css } from 'styled-components';
import { Link } from 'react-router-dom';

import AuthButton from './AuthButton';
import { colours, constants, fonts } from '../../styles.js';

const NavContainer = styled.div`
  margin: 0px;
  width: 100%;
  height: 50px;
  border-bottom: 1px solid #bbb;
  text-align: center;
  background-color: ${colours.spotifyBlack};
  font-family: 'Lucida Sans Unicode', Lucida Grande, sans-serif;
  /* position: fixed; */
`;

const NavContentContainer = styled.div`
  width: ${constants.mainContentContainerWidth};
  display: inline-block;
  height: 100%;
  font-size: 16px;
  color: white;
`;

const List = styled.ul`
  list-style-type: none;
  margin: 0;
  padding: 0;
  overflow: hidden;
  height: 100%;
  border-left: 1px solid #bbb;

  & ${ListItem}:nth-child(2) {
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
    background-color: #3e3b40;
    border-bottom: solid ${colours.spotifyBlack} 1px ;
  }

  & > a:active {
    color: grey;

  }
`;

const Nav = ({ colour, logo }) => {
  console.log('passed prop', colour, logo);
  return (
    <NavContainer>
      <NavContentContainer>
        <List>
          <ListItem>
            <Link to="/playlist">Test Playlist</Link>
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
