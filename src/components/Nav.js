import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import LogIn from "./LogIn";
import { colours } from "../styles.js";

const NavContainer = styled.div`
  width: 100%;
  height: 50px;
`;

const List = styled.ul`
  list-style-type: none;
  margin: 0;
  padding: 0;
  overflow: hidden;
  background-color: ${colours.grey};
  height: 100%;
`;

const ListItem = styled.li`
  float: left;
  height: 100%;
  border-right: 1px solid #bbb;

  & > a {
    display: block;
    color: ${colours.spotifyWhite};
    text-align: center;
    padding: 14px 16px;
    text-decoration: none;
  }

  & > a:hover {
    background-color: ${colours.spotifyBlack};
  }

  & > a:active {
    color: grey;
  }
`;

const Nav = () => {
  return (
    <NavContainer>
      <List>
        <ListItem>
          <Link to="/">Playlists</Link>
        </ListItem>
        <ListItem>
          <Link to="/">Search</Link>
        </ListItem>
        <ListItem style={{ float: "right" }}>
          <LogIn />
        </ListItem>
      </List>
    </NavContainer>
  );
};

export default Nav;
