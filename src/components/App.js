import { Switch, Route } from 'react-router-dom';
import React from 'react';
import styled from 'styled-components';

// import { Switch, Route } from "react-router-dom";
// import routes from "../routes";

import Home from './Home'
import Nav from './Nav';

const AppContainer = styled.div`
  margin-right: auto;
  margin-left:  auto;
  max-width: 960px;
  font-family: "Lucida Sans Unicode", "Lucida Grande", sans-serif;
`
class App extends React.Component {
  render() {
    return (
      <AppContainer>
        <Nav />
        {/* <Switch> */}
        <Route path="/" exact component={Home} />
        {/* </Switch> */}
        {/* <Switch>
            { routes.map( route => <Route key={ route.path } { ...route } /> ) }
        </Switch> */}
        </AppContainer>
    );
  }
}

export default App;
