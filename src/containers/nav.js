import React from 'react';
import { connect } from 'react-redux';

import { fetchUser } from '../actions';
import Nav from '../components/Nav';

class NavContainer extends React.Component {
  render() {
    const { token, userId } = this.props;
    return <Nav token={token} userId={userId} />;
  }
}

const mapStateTopProps = state => {
  return {
    token: state.auth.token,
    userId: state.user.userId
  };
};

NavContainer.serverFetch = fetchUser;

export default connect(
  mapStateTopProps,
  { fetchUser }
)(NavContainer);
