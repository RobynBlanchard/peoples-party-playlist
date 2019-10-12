import { Switch, Route } from 'react-router-dom';
import React from 'react';
import styled from 'styled-components';

import { colours, fonts } from '../globalStyles';
import Playlist from '../containers/playlist';
import Home from '../templates/Homepage';
import Search from '../containers/search';
import Nav from '../containers/nav';

const AppContainer = styled.div`
  margin-right: auto;
  margin-left: auto;
  font-family: ${fonts.font1};
  color: ${colours.spotifyWhite};
  background-image: linear-gradient(to right bottom, ${colours.primaryDark}, ${colours.primaryLight});
  min-height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

class App extends React.Component {
  render() {
    return (
      <div>
        <Nav />
        <Switch>
          <Route path="/" exact component={Home} />
          <AppContainer>
            <Route path="/playlist" exact component={Playlist} />
            <Route path="/search" exact component={Search} />
          </AppContainer>
        </Switch>
      </div>
    );
  }
}

export default App;
