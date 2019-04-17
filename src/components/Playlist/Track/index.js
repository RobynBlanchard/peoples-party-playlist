import React from 'react';
import styled, { keyframes } from 'styled-components';
import { increaseVote } from '../../../actions';

const Button = styled.button`
  background: none;
  color: inherit;
  border: none;
  padding: 0;
  font: inherit;
  cursor: pointer;
  outline: inherit;

  /* &:hover {
    transform: translateY(-0.15rem); */
    /* box-shadow: 0 1rem 2rem rgba(0,0,0,.2); */
  /* } */

  /* &:active {
    transform: translateY(0.1rem); */
    /* box-shadow: 0 .5rem 1rem rgba(0,0,0,.2); */
  /* } */
`;

const keyFrame = keyframes`
  0% {
    color: green;
  }
  100% {
    background: none;
  }
`;
const Container = styled.div`
  border-bottom: solid 1px #333333;
  width: 920px;
  height: 50px;
  margin: 5px;

  display: flex;
  justify-content: space-between;

  &:focus-within {
    /* NOTE - does not work if same element
       clicked on twice unless you click
       off button within track then on the
       button again */
    /* animation: ${keyFrame} 2s ease-in-out 0s; */
    /* transform: translateY(-.3rem); */

    /* TODO: */
    box-shadow: 0 1rem 2rem rgba(0, 0, 0, 0.2);
    border-radius: 100px;
    background: rgba(177, 228, 86, 0.16);
    color: pink;
    /* animation: ease 2s linear ; */

  }
`;

const VotesContainer = styled.div`
  width: 100px;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const VotesText = styled.p`
  padding: 10px;
  width: 20px;
  text-align: center;
`;

const TrackDetails = styled.div`
  width: 550px;
  height: 100%;
  padding: 0 10px;
`;

const Icon = styled.img`
  height: 20px;
  width: 20px;
`;

const Track = ({
  artist,
  song,
  votes,
  id,
  uri,
  downVoteAction,
  upVoteAction,
  position
}) => {
  return (
    <li>
      <Container>
        <TrackDetails>
          <p>{artist + ' - ' + song}</p>
        </TrackDetails>
        <VotesContainer>
          {/* todo remove id and use uri instead */}
          <Button onClick={() => downVoteAction(id, position, uri)}>
            <Icon src="http://localhost:3000/images/minus.svg" />
          </Button>
          <VotesText>{votes}</VotesText>
          <Button onClick={() => upVoteAction(id, position)}>
            <Icon src="http://localhost:3000/images/plus.svg" />
          </Button>
        </VotesContainer>
      </Container>
    </li>
  );
};

export default Track;
