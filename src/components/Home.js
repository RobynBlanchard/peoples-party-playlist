import React from 'react';
import styled from 'styled-components';

const Logo = styled.div`
  /* background-image: '../static/img/Spotify_Logo_RGB_Green.png'; */
  background-image: url('../static/img/Spotify_Logo_RGB_Green.png');

  width: 200px;
  height: 200px;
`;
class Home extends React.Component {
  render() {
    return (
      <div>
        <h2>Home

        </h2>
        <Logo />
      </div>
    );
  }
}

export default Home;
