import React from 'react';
import { connect } from 'react-redux';
import styled, { keyframes } from 'styled-components';

import { fetchUser } from '../../../actions';
import { colours, fonts } from '../../../styles';

const LogInButton = styled.a`
  height: 100%;
  display: block;
  color: inherit;
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
  display: block;
  text-align: center;
  padding: 16px 16px;
  text-decoration: none;
  width: 75px;
  list-style: none;
  display: inline-block;
  position: relative;

  &:hover {
    background-color: ${colours.primaryLight};
  }
`;

const DropBtn = styled.button`
  color: inherit;
  padding: 16px;
  font-size: 16px;
  background-color: ${colours.spotifyBlack};
  border: none;
  cursor: pointer;

  &:hover {
    background-color: ${colours.primaryLight};
  }
`;

const DropDownContent = styled.div`
  display: none;
  position: absolute;
  background-color: ${colours.primaryDark};

  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
  text-align: left;
`;

const Dropdown = styled.div`
  position: relative;
  display: inline-block;
  font-family: ${fonts.font1};

  &:hover {
    background-color: ${colours.primaryDark};
    border-bottom: solid ${colours.primaryDark} 1px;
    ${DropDownContent} {
      display: block;
    }
  }
`;

const Anchor = styled.a`
  color: inherit;
  padding: 12px 16px;
  text-decoration: none;
  display: block;

  &:hover {
    background-color: ${colours.primaryDark};

    color: ${colours.black};
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
    const { token, userId } = this.props;
    if (token) {
      return this.renderAccountButton(userId);
    }
    return this.renderLogInButton();
  }
}

AuthButton.serverFetch = fetchUser;

const mapStateToProps = state => {
  return {
    token: state.auth.token,
    userId: state.user.userId
  };
};

export default connect(
  mapStateToProps,
  { fetchUser }
)(AuthButton);
