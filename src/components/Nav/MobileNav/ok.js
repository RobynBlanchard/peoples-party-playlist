import React from 'react';
import styled from 'styled-components';

const NavWrapper = styled.div`
  /* overflow: hidden; */
  background-color: #333;
  position: relative;
  margin: 0px;
  width: 100%;
  height: 50px;
  /* height: 50px; */
  /* display: flex;
  flex-direction: row;
  justify-content: space-between; */
`;

const Button = styled.a`
  /* background-color: #ddd; */
  /* color: black; */
  height: 50px;
  width: 50px;
  /* background: black; */
  display: block;
  position: relative;
  left: 0;
  top: 0;
`;

const Link = styled.a`
  background-color: #ddd;
  color: black;
`;

const NavLinks = styled.div`
  display: ${props => (props.open ? 'block' : 'none')};

  & > ${Link} {
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
`;

const Test = styled.div`
  background: black;
  display: block;
  position: absolute;
  right: 0;
  top: 0;
  height: 50px;
  width: 60px;
`;

const Icon = styled.i`
  height: 20px;
  width: 20px;
  background: black;
  display: block;
  position: absolute;
  right: 0;
  top: 0;
`;


class MobileNav extends React.Component {
  state = { mobileOpen: false };

  handleClick = () => {
    console.log('clicked');
    console.log(this.state);
    this.setState({ mobileOpen: !this.state.mobileOpen });
  };

  render() {
    return (
      <NavWrapper>
        <Button onClick={() => this.handleClick()}>
          <img src="images/hamburger.svg" />
        </Button>
        <NavLinks open={this.state.mobileOpen}>
          <Link href="#news">News</Link>
          <Link href="#contact">Contact</Link>
          <Link href="#about">About</Link>
        </NavLinks>
        <Link href='/'>
        Party Playlist
        </Link>

      </NavWrapper>
    );
  }
}

export default MobileNav;
