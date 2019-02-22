import React from 'react'
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const NavContainer = styled.div`
  width: 100%;
  height: 50px;
`

const List = styled.ul`
  list-style-type: none;
  margin: 0;
  padding: 0;
  overflow: hidden;
  background-color: #333;
`;

const ListItem = styled.li`
  float: left;
  border-right:1px solid #bbb;

  & > a {
    display: block;
    color: white;
    text-align: center;
    padding: 14px 16px;
    text-decoration: none;
  }

  & > a:hover {
    background-color: #111;
  }

  & > a:active {
    color: grey;
  }

  &:last-child {
    border-right: none;
    background-color: #1DB954;
    border-radius: 25px;
  }
`;

const Nav = () => {
  return (
    <NavContainer>
      <List>
        <ListItem><Link to="/">Playlists</Link></ListItem>
        <ListItem><Link to="/">Search</Link></ListItem>
        {/* <ListItem><Link to="/">Search</Link></ListItem> */}
        <ListItem style={{float:'right'}}><a href="/login">Login with Spotify</a></ListItem>
      </List>
    </NavContainer>
  )
}

export default Nav;