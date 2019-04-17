import React from 'react';
import styled, { keyframes } from 'styled-components';
import SectionOne from './SectionOne';
import SectionTwo from './SectionTwo';
import SectionThree from './SectionThree';
import Nav from '../Nav';

import { colours, constants, fonts } from '../../styles.js';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  background-size: 100%;
`;

const Wrap = styled.div`
  height: 100%;
  font-family: ${fonts.font1};
  font-size: 44px;
  color: white;
`;

const Parallax = styled.div`
  /* The image used */
  background-image: url('images/vinyl.jpg');
  /* clip-path: polygon(50% 0%, 100% 0, 100% 81%, 50% 100%, 0 81%, 0 0); */

  /* Full height */
  height: 85vh;

  /* Create the parallax scrolling effect */
  background-attachment: fixed;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const Static = styled.div`
  /* clip-path: polygon(50% 17%, 100% 0, 100% 100%, 50% 100%, 0 100%, 0 0);
  clip-path: polygon(50% 17%, 100% 0, 100% 100%, 50% 100%, 0 100%, 0 0); */
  /* clip-path: polygon(50% 17%, 100% 0, 100% 83%, 50% 100%, 0 83%, 0 0); */
  height: 80vh;
  font-size: 36px;
  width: 100%;
`;

const keyFrameMoveUp = keyframes`
   50% {
    transform: translateY(-50px);
    color: #1db954;
  }
`;

// Section One
const Title = styled.div`
  display: flex;
  flex-direction: row;
  text-shadow: 2px 2px 2px #000000;
  font-family: ${fonts.title};
  /* font-family: 'Karla', sans-serif; */
  text-transform: uppercase;
  font-size: 44px;
  /* font-size: 3vw; */
  /* color: white; */
`;

const Head = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Copy = styled.p`
  font-family: ${fonts.font1};
  /* text-transform: uppercase; */
  font-size: 16px;
  /* color: white; */
`;

const Woo = styled.h2`
  padding: 0 24px;
  animation: ${keyFrameMoveUp} 2s ease-in-out infinite;
`;



class Home extends React.Component {
  state = {
    color: '',
    logo: 'big',
  }

  listenScrollEvent = e => {
    if (window.scrollY > 40) {
      console.log('a');
      this.setState({ color: 'black' });
      this.setState({logo: 'small'})

    } else {
      console.log('b');
      this.setState({logo: 'big'})
      this.setState({ color: '' });
    }
  };

  componentDidMount() {
    // window.addEventListener('scroll', this.listenScrollEvent);
  }
  render() {
    return (
      // <Container>
      //   <SectionOne />
      //   <SectionTwo />
      //   <SectionThree />
      // </Container>
      <Wrap>
        {/* <Nav colour={'#12120f'} logo={this.state.logo} /> */}
        <Parallax>
          <Head>
            <Title>
              <h2>People's Party Playlist</h2>
              <Woo>\o/</Woo>
            </Title>
            <Copy>The ultimate online jukebox experience</Copy>
            {/* <Copy>A necessity at your next party.</Copy> */}
          </Head>
        </Parallax>
        <Parallax>
          <Static>
            <SectionTwo />

            {/* </SectionTwo>
          <h1>Boring</h1> */}
          </Static>
        </Parallax>
        <Parallax>
          <SectionThree />
          {/* <h1>SO FWUFFY AWWW</h1> */}
        </Parallax>
      </Wrap>
    );
  }
}

export default Home;
