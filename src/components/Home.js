import React from 'react';
import styled from 'styled-components';
import Spotify_Logo_RGB_Green from '../static/img/Spotify_Logo_RGB_Green.png';
const Logo = styled.div`
  /* background-image: '../static/img/Spotify_Logo_RGB_Green.png'; */
  /* background-image: url('/static/img/Spotify_Logo_RGB_Green.png'); */
  /* background-image: url('11dc437ab8ef0c32289c092083d20068.png'); */
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
        {/* <img src={Spotify_Logo_RGB_Green} alt="Spotify_Logo_RGB_Green" /> */}
        {/* <img src={require('./Spotify_Logo_RGB_Green.png')} /> */}
      </div>
    );
  }
}

export default Home;
