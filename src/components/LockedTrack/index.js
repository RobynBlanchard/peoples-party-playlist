import React from 'react';
import styled, { css, animation, keyframes } from 'styled-components';
import Track from '../Track';
import Icon from '../Icon';
import { media, colours } from '../../globalStyles';

export const Container = styled.div`
  margin: 0;
  ${media.tablet`
    padding: 0 8px; 
    margin: 8px -8px;
  `}
  width: 100%;
  opacity: 0.9;
  border: 1px solid grey;
  background-color: ${colours.primaryDark};
  border-radius: 24px;
  box-shadow: white;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 1);
`;

const Table = styled.table`
  width: 100%;
`;

const IconWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 80px;
  height: 30px;
`;

const LockedTrack = ({ track, playing }) => {
  const { name, artist } = track;

  return (
    <Container>
      <Table>
        <tbody>
          <Track name={name} artist={artist} isLocked>
            <IconWrapper>
              <Icon isPlaying={playing} />
            </IconWrapper>
          </Track>
        </tbody>
      </Table>
    </Container>
  );
};
export default LockedTrack;
