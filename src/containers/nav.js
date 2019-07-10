import React from 'react';
import { connect } from 'react-redux';

import Nav from '../components/Nav';

class NavContainer extends React.Component {
  render() {
    const { token } = this.props;
    return <Nav token={token} />;
  }
}

const mapStateTopProps = state => {
  return {
    token: state.auth.token,
    userId: state.user.userId
  };
};

export default connect(
  mapStateTopProps,
  null
)(NavContainer);
