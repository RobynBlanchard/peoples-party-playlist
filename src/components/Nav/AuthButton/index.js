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

const DropDownLink = styled.a`
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
  text-align: left;
`;

const DropDownContent = styled.div`
  display: none;
  position: absolute;
  min-width: 100px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
  margin-top: 15px;
`;

const LinkContainer = styled.div`
  border-right: none;
  display: block;
  color: white;
  text-align: center;
  padding: 16px 16px;
  text-decoration: none;
  width: 75px;

  &:hover {
    background-color: ${colours.spotifyBlack};
    border-bottom: solid ${colours.spotifyBlack} 1px ;
    ${DropDownContent} {
      display: block;
    }
  }
`;

class AuthButton extends React.Component {
  renderAccountButton(userId) {
    return (
      <LinkContainer>
        {userId === '' ? 'Account' : userId}
        <DropDownContent>
          <DropDownLink href="/change-user">Change User</DropDownLink>
          <DropDownLink href="/log-out">Log out</DropDownLink>
        </DropDownContent>
      </LinkContainer>
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
