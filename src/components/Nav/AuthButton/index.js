import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import { fetchUser } from '../../../actions';
import { colours } from '../../../styles.js';

const LogInButton = styled.a`
  height: 100%;
  display: block;
  color: white;
  text-align: center;
  text-decoration: none;

  & > img {
    height: 20px;
    width: 20px;
    float: right;
  }
`;

// const Nav__submenu = styled.ul`
//   display: none;
//   /* z-index: 999; */

//   list-style: none;
//   padding-left: 0;
//   margin-top: 0;
//   margin-bottom: 0;

//   position: absolute;

//   display: none;
//   position: absolute;
//   background-color: #f9f9f9;
//   min-width: 160px;
//   box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
//   overflow: hidden;
//   z-index: 999999999;

//   /* text-align: left; */
// `

const LinkContainer = styled.div`
  padding: 14px 16px;

  /* border-right: none;
  display: block;
  color: white;
  text-align: center;
  padding: 16px 16px;
  text-decoration: none;
  width: 75px;

  list-style: none;
  display: inline-block;
  position: relative;

  &:hover {
    background-color: ${colours.spotifyBlack};
    border-bottom: solid ${colours.spotifyBlack} 1px;
    ${NavSubMenu} {
      display: block;
    }
  } */
  /* text-align: center; */
  width: 100px;
  box-sizing: border-box;

  font-size: 16px;
  line-height: 1.5;
/*
  &:hover ${Nav__submenu} {
      display: block;
  } */

`;

const DropBtn = styled.button`
  background-color: #4caf50;
  color: white;
  padding: 16px;
  font-size: 16px;
  border: none;
`;
const DropDownContent = styled.div`
  display: none;
  position: absolute;
  background-color: #f1f1f1;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
`;

const Dropdown = styled.div`
  position: relative;
  display: inline-block;

  /* &:hover {
    ${DropDownContent} {
      display:block;
    }

    ${DropBtn} {
      background-color: #3e8e41;
    }
  } */
  &:hover ${DropDownContent} {
    display:block;
  }
`;

const Anchor = styled.a`
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;

  &:hover {
    background-color: #ddd;
  }
`;
class AuthButton extends React.Component {
  renderAccountButton(userId) {
    return (
      <Dropdown>
        <DropBtn>Dropdown</DropBtn>
        <DropDownContent>
          <Anchor href="#">Link 1</Anchor>
          <Anchor href="#">Link 2</Anchor>
          <Anchor href="#">Link 3</Anchor>
        </DropDownContent>
      </Dropdown>
    );
  }

  renderLogInButton() {
    return (
      // <LinkContainer>
      //   <LogInButton href="/login">
      //     Login{' '}
      //     <img src="http://localhost:3000/images/Spotify_Icon_RGB_Green.png" />
      //   </LogInButton>
      // </LinkContainer>

      <Dropdown>
        <DropBtn>Dropdown</DropBtn>
        <DropDownContent>
          <Anchor href="#">Link 1</Anchor>
          <Anchor href="#">Link 2</Anchor>
          <Anchor href="#">Link 3</Anchor>
        </DropDownContent>
      </Dropdown>
    );
  }

  render() {
    const { signedIn, userId } = this.props;
    if (signedIn) {
      return this.renderAccountButton(userId);
    }
    return this.renderLogInButton();
  }
}

AuthButton.serverFetch = fetchUser;

const mapStateToProps = state => {
  return {
    signedIn: state.auth.signedIn,
    userId: state.auth.userId
  };
};

export default connect(
  mapStateToProps,
  { fetchUser }
)(AuthButton);
