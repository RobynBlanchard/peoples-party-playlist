import { Link, Switch, Route } from 'react-router-dom';
import React from 'react';
import Home from './Home';
import About from './About';

class Layout extends React.Component {
  render() {
    return (
      <div>
        <div>
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
        </div>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/about" exact component={About} />
        </Switch>
      </div>
    );
  }
}

export default Layout;
