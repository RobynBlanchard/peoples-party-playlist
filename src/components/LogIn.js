import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

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
  renderAuthButton() {
    if (this.props.isSignedIn === null) {
      return null;
    } else if (this.props.isSignedIn) {
      return (
        <LinkContainer>
          <Button href="/#">Sign out</Button>
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

const mapStateToProps = state => {
  return { isSignedIn: state.loggedIn };
};

export default connect(
  mapStateToProps,
  null
)(LogIn);
