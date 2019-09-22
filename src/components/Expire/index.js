import React from 'react';

class Expire extends React.Component {
  state = { visible: true };

  componentDidMount() {
    this.setTimer();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.children !== this.props.children) {
      this.setTimer();
      this.setState({ visible: true });
    }
  }

  setTimer() {
    if (this.timer != null) {
      clearTimeout(this.timer);
    }

    this.timer = setTimeout(() => {
      this.setState({ visible: false });
      this.timer = null;
    }, this.props.delay);
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  render() {
    return this.state.visible ? this.props.children : <span />;
  }
}

export default Expire;
