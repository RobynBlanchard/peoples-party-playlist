import { Switch, Route } from 'react-router-dom';
import React from 'react';
import styled from 'styled-components';

import { colours, constants, fonts } from '../styles';
import Playlists from './Playlists';
import Playlist from './Playlist';
import Home from './Home';
import Nav from './Nav';
import Search from './Search';
import Test from './Test';


const AppContainer = styled.div`
  margin-right: auto;
  margin-left: auto;
  font-family: ${fonts.font1};
  color: ${colours.spotifyWhite};
  /* background: linear-gradient(#540909, #022147); */
  /* background-image: linear-gradient(to right bottom,#e0e0e0,#bdbdbd); */
  /* background-image: linear-gradient(to right bottom,#212121,#424242); */
  background-image: linear-gradient(to right bottom, ${colours.primaryDark}, ${colours.primaryLight});

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
          <Route path="/test" exact component={Test} />
          <Route path="/" exact component={Home} />
          <AppContainer>
            <Route path="/playlist" exact component={Playlist} />
            <Route path="/playlists" exact component={Playlists} />
            <Route path="/search" exact component={Search} />
          </AppContainer>
        </Switch>
      </div>
    );
  }
}

export default App;
