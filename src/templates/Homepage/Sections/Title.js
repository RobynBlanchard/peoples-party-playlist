import React from 'react';
import styled from 'styled-components';
import { media } from '../../../globalStyles';
import Mouse from '../../../components/ScrollingMouse';
import JukeboxAnimation from '../../../components/JukeboxAnimation';

const Title = styled.div`
  display: flex;
  flex-direction: column;
  text-align: justify;
  -webkit-font-smoothing: antialiased;
  /* height: 70%; */
  display: flex;
  justify-content: center;
  ${media.phone`text-align: center;`} /* position: relative; */
`;

const MainHeading = styled.h2`
  text-transform: uppercase;
  margin: 0px;
  text-shadow: 1px 1px 1px #000000;

  ${media.desktop`font-size: 54px;`}
  ${media.phone`font-size: 41px;`}
`;

const SubHeading = styled.p`
  text-transform: uppercase;
  margin: 0px;
  font-size: 24px;
  letter-spacing: 10px;
  text-shadow: 1px 1px 1px #000000;
  padding-left: 7px;
  margin: 20px 0;
  padding: 0;

  ${media.desktop`font-size: 16px;`}
  ${media.phone`font-size: 18px;`}
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  /* height: 100%; */
  justify-content: space-around;
  padding: 40px;
`;

const SectionOne = () => {
  return (
    <Container>
      <Title>
        <MainHeading>People's</MainHeading>
        <MainHeading>
          {' '}
          P<JukeboxAnimation />
          rty{' '}
        </MainHeading>
        <MainHeading> Playlist</MainHeading>
        {/* <div> */}
        <SubHeading>The Ultimate online jukebox experience</SubHeading>
          {/* </div> */}
      </Title>
      <Mouse />
    </Container>
  );
};

export default SectionOne;

// jukebox icon credit
{
  /* <div>Icons made by <a href="https://www.flaticon.com/authors/vitaly-gorbachev" title="Vitaly Gorbachev">Vitaly Gorbachev</a> from <a href="https://www.flaticon.com/"                 title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/"                 title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a></div> */
}
{
  /* <div>Icons made by <a href="https://www.freepik.com/" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/"                 title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/"                 title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a></div> */
}
