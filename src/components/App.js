import { Switch, Route } from 'react-router-dom';
import React from 'react';
import styled from 'styled-components';

import Playlists from './Playlists';
import Playlist from './Playlist';
import Nav from './Nav';

const AppContainer = styled.div`
  margin-right: auto;
  margin-left: auto;
  max-width: 960px;
  font-family: 'Lucida Sans Unicode', 'Lucida Grande', sans-serif;
`;
class App extends React.Component {
  render() {
    return (
      <AppContainer>
        <Nav />
        <Switch>
          <Route path="/playlists" exact component={Playlists} />
          <Route path="/playlist" exact component={Playlist} />
        </Switch>
      </AppContainer>
    );
  }
}

export default App;
