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
  color: ${colours.spotifyWhite};
  /* display: flex;
  align-items: center;
  flex-direction: column; */
  background: linear-gradient(#540909, #022147);
  width: 100%;
`;

const ContentContainer = styled.div`
  /* width: ${constants.mainContentContainerWidth}; */
  /* display: flex; */
  /* justify-content: center; */
  /* min-height: 600px; */
  /* width: 100%; */
  /* align-items: center; */
`;

const Main = styled.div`
  /* font-size: 62.5%; */
`

class App extends React.Component {
  render() {
    return (
      <Main>
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
      </Main>
    );
  }
}

export default App;
