import { Switch, Route } from 'react-router-dom';
import React from 'react';
import styled from 'styled-components';
import Playlists from './Playlists';
import Playlist from './Playlist';
import Home from './Home';
import Nav from './Nav';
// import MusicPlayer from './MusicPlayer';
import { colours, constants, fonts } from '../styles.js';

const AppContainer = styled.div`
  margin-right: auto;
  margin-left: auto;
  font-family: ${fonts.font1};
  min-height: 480px;
  color: ${colours.spotifyWhite};
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const ContentContainer = styled.div`
  width: ${constants.mainContentContainerWidth};
  display: flex;
  justify-content: center;
  min-height: 480px;
`;


class App extends React.Component {
  render() {
    return (
      // <AppContainer>
      <div>
        <Nav />
        {/* <Route path={['/playlist', '/playlists']} component={MusicPlayer} /> */}
        <Switch>
          <Route path="/" exact component={Home} />
          <ContentContainer className={"content-container"}>
          <Route path="/playlist" exact component={Playlist} />
          <Route path="/playlists" exact component={Playlists} />
          </ContentContainer>
        </Switch>
        </div>
      // </AppContainer>
    );
  }
}

export default App;
