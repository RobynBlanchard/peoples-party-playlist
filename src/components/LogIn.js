import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import styled from 'styled-components';

import { fetchUser } from '../actions/';

const Button = styled.a`
  border-right: none;
  background-color: #1db954;
  border-radius: 25px;

  display: block;
  color: white;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
`;

const LinkContainer = styled.div`
  height: 100%;
`;

class LogIn extends React.Component {
  componentDidMount() {
    const { userId, fetchUser } = this.props;

    if (!userId) fetchUser();
  }

  renderAuthButton() {
    if (this.props.signedIn) {
      return (
        <LinkContainer>
          {/* <Button href="/log-out">
            Log out
          </Button> */}
          <Button href="/change-user">
            {this.props.userId} : Change User
          </Button>
        </LinkContainer>
      );
    }
    return (
      <LinkContainer>
        <Button href="/login">Login with Spotify</Button>
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
    signedIn: state.loggedIn.signedIn,
    token: state.loggedIn.token,
    userId: state.loggedIn.userId
  };
};

export default connect(
  mapStateToProps,
  { fetchUser }
)(LogIn);
