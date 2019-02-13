import { Link, Switch, Route } from 'react-router-dom';
import React from 'react';

import Home from './Home';

class App extends React.Component {
  render() {
    return (
      <div>
        <div>
          <Link to="/">Home</Link>
          <a href="/login">Login</a>
        </div>
        <Switch>
          <Route path="/" exact component={Home} />
        </Switch>
      </div>
    );
  }
}

export default App;
