import React from 'react';
import styled, { keyframes, css } from 'styled-components';
import { fonts, media } from '../../../styles.js';

const Title = styled.div`
  display: flex;
  flex-direction: column;
  text-align:justify;
  /* text-shadow: 2px 2px 2px #000000;
  /* font-family: ${fonts.title}; */
  /* text-transform: uppercase; */
  /* font-size: 44px; */
  -webkit-font-smoothing: antialiased;
  /* margin-top: 72px; */
  height: 70%;
  display: flex;
  justify-content: center;
  ${media.phone`text-align: center;`}
/* TODO give this a height to push scroll to bottom  */
  &:after {
    content: "";
    display: inline-block;
    width: 100%;
  }
`;


const MainHeading = styled.h2`
  text-transform: uppercase;
  margin: 0px;
  text-shadow: 1px 1px 1px #000000;
  /* font-size: 54px; */

  ${media.tablet`font-size: auto;`}
  ${media.desktop`font-size: auto;`}
  ${media.phone`font-size: auto;`}

  ${media.desktop`font-size: 54px;`}
  /* ${media.tablet`background: mediumseagreen;`} */
  ${media.phone`font-size: 41px;`}




`
const SubHeading = styled.p`
  text-transform: uppercase;
  margin: 0px;
  font-size: 24px;
  letter-spacing: 10px;
  text-shadow: 1px 1px 1px #000000;
  /* text-align:justify; */
  /* font-size: 16px; */
  ${media.desktop`font-size: 16px;`}
  ${media.phone`font-size: 18px;`}

`

const Head = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  justify-content: space-around;
`;

const keyFrameMoveUp = keyframes`
   50% {
    transform: translateY(-50px);
    color: #1db954;
  }
`;

// const Woo = styled.h2`
//   padding: 0 24px;
//   animation: ${keyFrameMoveUp} 2s ease-in-out infinite;
// `;

// const HeadingTwo = styled.p`
//   text-transform: uppercase;
//   display: inline-block;
//   background-image: linear-gradient(to right, #7ed56f, #28b485);
//   -webkit-background-clip: text;
//   background-clip: text;
//   color: transparent;
//   letter-spacing: 2px;
//   transition: all .2s;
//   font-family: ${fonts.font1};
//   font-size: 20px;
//   font-weight: 700px;
// `
const ScrollSuggestion = styled.div`
  width :34px;
  height: 55px;
`

const scrollAnimation = keyframes`
  0% { opacity: 0; }
  10% { transform: translateY(0); opacity: 1; }
  100% { transform: translateY(15px); opacity: 0;
`
const Scroll = styled.div`
  width: 3px;
  /* height: 10px; */
  height: 4px;
  border-radius: 25%;
  background-color: #fff;
  animation-name: ${scrollAnimation};
  animation-duration: 2.2s;
  animation-timing-function: cubic-bezier(.15,.41,.69,.94);
  animation-iteration-count: infinite;
`
const Mouse = styled.div`
  width: 3px;
  padding: 6px 12px;
  height: 28px;
  /* width: 3px;
  padding: 10px 15px;
  height: 35px; */
  border: 2px solid #fff;
  border-radius: 25px;
  opacity: 0.75;
  /* box-sizing: content-box; */
`



const SectionOne = () => {
  return (
    <Head>
      <Title>
        <MainHeading>People's Party Playlist</MainHeading>
        {/* <Woo>\o/</Woo> */}


        <SubHeading>The Ultimate online jukebox experience</SubHeading>
      </Title>
      {/* <HeadingTwo>The ultimate online jukebox experience</HeadingTwo> */}
      <ScrollSuggestion>
        <Mouse>
          <Scroll />
        </Mouse>
      </ScrollSuggestion>
    </Head>
  );
};

export default SectionOne;
