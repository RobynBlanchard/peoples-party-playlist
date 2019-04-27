import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import { fetchUser } from '../../../actions';
import { colours, fonts } from '../../../styles.js';

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

const LinkContainer = styled.div`
  padding: 14px 16px;
  border-right: none;
  border-left: 1px solid #bbb;
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
    background-color: #3e3b40;
    border-bottom: solid ${colours.spotifyBlack} 1px;
  }
`;

const DropBtn = styled.button`
  color: white;
  padding: 16px;
  font-size: 16px;
  background-color: ${colours.spotifyBlack};
  border: none;
  cursor: pointer;

  &:hover {
    background-color: #3e3b40;
    border-bottom: solid ${colours.spotifyBlack} 1px;
  }
`;

const DropDownContent = styled.div`
  display: none;
  position: absolute;
  background-color: #3e3b40;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
  text-align: left;
  border-left: none ;
`;

const Dropdown = styled.div`
  position: relative;
  display: inline-block;
  border-left: 1px solid #bbb;
  font-family: ${fonts.font1};


  &:hover {
    background-color: #3e3b40;
    border-bottom: solid ${colours.spotifyBlack} 1px;
    ${DropDownContent} {
      display:block;
    }
  }
`;

const Anchor = styled.a`
  color: white;
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
        <DropBtn>{userId === '' ? 'Account' : userId}</DropBtn>
        <DropDownContent>
          <Anchor href="/change-user">Change user</Anchor>
          <Anchor href="/log-out">Log out</Anchor>
        </DropDownContent>
      </Dropdown>
    );
  }

  renderLogInButton() {
    return (
      <LinkContainer>
        <LogInButton href="/login">
          Login{' '}
          <img src="http://localhost:3000/images/Spotify_Icon_RGB_Green.png" />
        </LogInButton>
      </LinkContainer>
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
