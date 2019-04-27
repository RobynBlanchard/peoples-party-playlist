import { Switch, Route } from 'react-router-dom';
import React from 'react';
import styled from 'styled-components';
import Playlists from './Playlists';
import Playlist from './Playlist';
import Home from './Home';
import Nav from './Nav';
import Search from './Search';
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
  /* background-color: ${colours.spotifyBlack}; */
  /* background: linear-gradient(#e66465, #9198e5); */
  /* background: linear-gradient(#540909,#153e47); */
  background: linear-gradient(#540909, #022147);

  /* width: 100vh; */
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
      <div>
        <Nav />
        {/* <Route path={['/playlist', '/playlists']} component={MusicPlayer} /> */}
        <Switch>
          <Route path="/" exact component={Home} />
          <AppContainer>
            <ContentContainer className={'content-container'}>
              <Route path="/playlist" exact component={Playlist} />
              <Route path="/playlists" exact component={Playlists} />
              <Route path="/search" exact component={Search} />
            </ContentContainer>
          </AppContainer>
        </Switch>
      </div>
    );
  }
}

export default App;
