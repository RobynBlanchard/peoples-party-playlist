import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import { fetchUser } from '../actions/';

const LogInButton = styled.a`
  border-right: none;
  background-color: #1db954;
  border-radius: 25px;

  /* display: block; */
  color: white;
  text-align: center;
  padding: 10px 10px;
  vertical-align: middle;
  text-decoration: none;
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
  height: 100%;
  border-right: none;
  display: block;
  color: white;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
  min-width: 100px;
  border-left: #333;

  &:hover {
    ${DropDownContent} {
      display: block;
      /* margin-left:-16px; */
    }
  }
`;

class LogIn extends React.Component {
  componentDidMount() {
    const { userId, fetchUser } = this.props;

    if (!userId) fetchUser();
  }

  renderAuthButton() {
    const { userId } = this.props;
    if (this.props.signedIn) {
      return (
        <LinkContainer>
            {userId === '' ? 'user' : userId}
            <DropDownContent>
              <DropDownLink href="/change-user">Change User</DropDownLink>
              <DropDownLink href="/log-out">Log out</DropDownLink>
            </DropDownContent>
        </LinkContainer>
      );
    }
    return (
      <LinkContainer>
        <LogInButton href="/login">Login with Spotify</LogInButton>
      </LinkContainer>
    );
  }

  render() {
    return <div>{this.renderAuthButton()}</div>;
  }
}

LogIn.serverFetch = fetchUser;

const mapStateToProps = state => {
  return {
    signedIn: state.auth.signedIn,
    token: state.auth.token,
    userId: state.auth.userId
  };
};

export default connect(
  mapStateToProps,
  { fetchUser }
)(LogIn);
