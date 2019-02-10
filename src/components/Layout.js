import { BrowserRouter, Link, Switch, Route } from 'react-router-dom';
import React from 'react';
import Home from './Home';
import LogIn from './LogIn';

class Layout extends React.Component {
  render() {
    return (
      <div>
        <div>
          <Link to="/">Home</Link>
          <Link to="/login">Log in</Link>
        </div>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/login" exact component={LogIn} />
        </Switch>
      </div>
    );
  }
}

export default Layout;
