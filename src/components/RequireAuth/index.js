import React from 'react';
import { connect } from 'react-redux';

export default ChildComponent => {
  class ComposedComponent extends React.Component {
    componentDidMount() {
      this.shouldNavigateAway();
    }

    componentDidUpdate() {
      this.shouldNavigateAway();
    }

    shouldNavigateAway() {
      if (!this.props.token) {
        this.props.history.push('/');
      }
    }

    render() {
      return <ChildComponent {...this.props} />;
    }
  }

  const mapStateToProps = state => {
    return { token: state.auth.token, userId: state.user.userId };
  };

  return connect(mapStateToProps)(ComposedComponent);
};
