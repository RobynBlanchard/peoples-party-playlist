import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { colours, fonts } from '../../../styles/index.js';

const NavWrapper = styled.div`
  background-color: ${colours.spotifyBlack};
  font-family: ${fonts.font1};
  position: relative;
  margin: 0px;
  width: 100%;
  height: 50px;
`;

const LinkWrapper = styled.div`
  & > a {
    color: white;
    padding: 14px 16px;
    text-decoration: none;
    font-size: 17px;
    display: block;

    &:hover {
      background-color: #ddd;
      color: black;
    }
  }
`

const NavLinks = styled.div`
  display: ${props => (props.open ? 'block' : 'none')};
  background-color: #3e3b40;
`;

const Burger = styled.a`
  height: 50px;
  width: 50px;
  display: block;
  position: absolute;
  right: 0;
  top: 0;
`;

const TopLinkWrapper = styled.div`
  height: 50px;
`;

class MobileNav extends React.Component {
  state = { mobileOpen: false };

  handleClick = () => {
    this.setState({ mobileOpen: !this.state.mobileOpen });
  };

  render() {
    return (
      <NavWrapper>
        <TopLinkWrapper>
          <Link to="/">{/* Logo */}</Link>
        </TopLinkWrapper>
        <NavLinks open={this.state.mobileOpen}>
          <LinkWrapper>
            <Link to="/playlist">Playlist</Link>
          </LinkWrapper>
          <LinkWrapper>
            <Link to="/search">Search</Link>
          </LinkWrapper>
          <LinkWrapper>
            <Link to="/log-out">Log out</Link>
          </LinkWrapper>
        </NavLinks>
        <Burger onClick={this.handleClick}>
          <img src="images/hamburger.svg" />
        </Burger>
      </NavWrapper>
    );
  }
}

export default MobileNav;
