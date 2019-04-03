import { Switch, Route } from 'react-router-dom';
import React from 'react';
import styled from 'styled-components';

import Playlists from './Playlists';
import Playlist from './Playlist';
import Home from './Home';
import Nav from './Nav';
import { colours, constants } from '../styles.js';

const AppContainer = styled.div`
  margin-right: auto;
  margin-left: auto;
  font-family: 'Lucida Sans Unicode', 'Lucida Grande', sans-serif;
  min-height: 480px;
  color: ${colours.spotifyWhite};
`;

const ContentContainer = styled.div`
  width: ${constants.mainContentContainerWidth};
  display: flex;
  justify-content: center;
`;

class App extends React.Component {
  render() {
    return (
      <AppContainer>
        <Nav />
        <Switch>
          <Route path="/" exact component={Home} />
          <ContentContainer>
            <Route path="/playlists" exact component={Playlists} />
          </ContentContainer>
          <Route path="/playlist" exact component={Playlist} />
        </Switch>
      </AppContainer>
    );
  }
}

export default App;
