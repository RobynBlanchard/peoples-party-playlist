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
  height: 400px;
  display: flex;
  text-align: center;
  justify-content: center;
  ${media.phone`text-align: center;`}
`;

const MainHeading = styled.h2`
  text-transform: uppercase;
  margin: 0px;
  text-shadow: 1px 1px 1px #000000;
  font-size: 56px;
`;

const SubHeading = styled.p`
  text-transform: uppercase;
  margin: 0px;
  font-size: 24px;
  letter-spacing: 10px;
  text-shadow: 1px 1px 1px #000000;
  padding-left: 7px;
  margin-bottom: 20px;
  padding: 0;
  text-align: center;
  font-size: 18px;
  padding-left: 6px;

  ${media.phone`margin-top: 20px;`}
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
`;

const MobileLineBreak = styled.br`
  display: none;
  ${media.phone`display: block;`}
`;

const SectionOne = () => {
  return (
    <Container>
      <Title>
        <MainHeading>
          People's
          <MobileLineBreak /> P<JukeboxAnimation />
          rty
          <MobileLineBreak /> Playlist
        </MainHeading>

        <SubHeading>The Ultimate online jukebox experience</SubHeading>
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
