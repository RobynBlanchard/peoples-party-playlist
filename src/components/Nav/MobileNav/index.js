import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { colours, fonts } from '../../../globalStyles';

const NavWrapper = styled.div`
  background-color: ${colours.black};
  font-family: ${fonts.font1};
  position: relative;
  margin: 0px;
  width: 100%;
  height: 50px;
  z-index: 1;
`;

const Chevron = styled.div`
  transform: ${props => props.shouldRotate && 'rotate(180deg)'};
  transition: all 0.5s;
`;

const DropDownContent = styled.div`
  display: ${props => (props.open ? 'block !important;`' : 'none')};
  background-color: ${colours.secondaryLight};
  opacity: 0.8;
`;

const LinkWrapper = styled.div`
  & > a {
    padding: 14px 16px;
    text-decoration: none;
    font-size: 17px;
    display: block;
    color: ${colours.spotifyWhite};

    &:hover {
      background-color: ${colours.secondaryLight};
      color: ${colours.black};
    }
  }
`;

const NavLinks = styled.div`
  display: ${props => (props.open ? 'block' : 'none')};
  background-color: ${colours.primaryLight};
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

const HomeIconLink = styled.img`
  height: 40px;
  padding: 4px;
`;

const AccountDropDown = styled.a`
  display: flex !important;
  justify-content: space-between;
`;

const ExternalLink = styled.a`
  color: black !important;
  &:active,
  &:hover {
    background-color: ${colours.secondaryDark} !important;
  }
`;

class MobileNav extends React.Component {
  state = { menuOpen: false, accountAccordianOpen: false };

  handleMenuOpenClick = () => {
    this.setState({ menuOpen: !this.state.menuOpen });
  };

  handleAccordianClick = () => {
    this.setState({ accountAccordianOpen: !this.state.accountAccordianOpen });
  };

  renderProtectedRoutes = () => {
    return (
      <>
        <LinkWrapper>
          <Link to="/playlist">Playlist</Link>
        </LinkWrapper>
        <LinkWrapper>
          <Link to="/search">Search</Link>
        </LinkWrapper>
      </>
    );
  };

  renderAccountDropDown = (accountAccordianOpen) => (
    <div onClick={this.handleAccordianClick}>
      <LinkWrapper>
        <AccountDropDown href="#">
          <div>Account</div>
          <Chevron shouldRotate={accountAccordianOpen}>&#9660;</Chevron>
        </AccountDropDown>
      </LinkWrapper>

      <DropDownContent open={accountAccordianOpen}>
        <LinkWrapper>
          <ExternalLink href="/change-user">Change user</ExternalLink>
        </LinkWrapper>
        <LinkWrapper>
          <ExternalLink href="/log-out">Log out</ExternalLink>
        </LinkWrapper>
      </DropDownContent>
    </div>
  );

  render() {
    const { token } = this.props;
    const { menuOpen, accountAccordianOpen } = this.state;

    return (
      <NavWrapper>
        <TopLinkWrapper>
          <Link to="/">
            <HomeIconLink src={'images/jukebox.svg'} />
          </Link>
        </TopLinkWrapper>
        <NavLinks open={menuOpen}>
          {token && this.renderProtectedRoutes()}
          {token ? (
            this.renderAccountDropDown(accountAccordianOpen)
          ) : (
            <LinkWrapper>
              <a href="/login">Log in</a>
            </LinkWrapper>
          )}
        </NavLinks>
        <Burger onClick={this.handleMenuOpenClick}>
          <img src="images/hamburger.svg" />
        </Burger>
      </NavWrapper>
    );
  }
}

export default MobileNav;
