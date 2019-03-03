import React from 'react';
import { connect } from 'react-redux';
import LogInUI from './LogInUI';

class LogIn extends React.Component {
  renderAuthButton() {
    if (this.props.isSignedIn === null) {
      return null;
    } else if (this.props.isSignedIn) {
      // return <a href="/#">Sign out</a>
      return <LogInUI href="/#" text="Sign out" />
    } else {
      return <LogInUI href="/login" text="Login with Spotify" />
      // return <a href="/login">Login with Spotify</a>
    }
  }

  render() {
    return <div>{this.renderAuthButton()}</div>;
  }
}

const mapStateToProps = (state) => {
  return { isSignedIn: state.loggedIn }
}

export default connect(
  mapStateToProps,
  null
)(LogIn);
