import React from 'react';
import styled from 'styled-components';
import RotatingCard from '../../../components/RotatingCard';
import { colours } from '../../../globalStyles';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  width: 100%;
  /* height: 100%; */
  padding: 20px 0;
  background-color: rgba(${colours.primaryLightRGBA}, 0.29);
`;

const BlocksWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  align-items: center;
  width: 90%;
  height: 100%;
  margin: 20px 0 20px 0;
`;

class SectionTwo extends React.Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
    this.state = {
      cardOpen: false
    };
  }

  listenScrollEvent = e => {
    if (window.scrollY > this.myRef.current.offsetTop - 200) {
      this.setState({ cardOpen: true });
    } else {
      this.setState({ cardOpen: false });
    }
  };

  componentDidMount() {
    window.addEventListener('scroll', this.listenScrollEvent);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.listenScrollEvent);
  }

  render() {
    const content = [
      {
        image: 'images/disc.svg',
        text: 'Create your own playlist',
        peekCard: true
      },
      {
        image: 'images/thumbs_up.svg',
        text: 'Upvote to move tracks up the playlist'
      },
      {
        image: 'images/thumbs_down.svg',
        text: 'Downvote to move tracks down the playlist'
      },
      {
        image: 'images/sad.svg',
        text: '5 downvotes will remove the track from the playlist'
      }
    ];
    return (
      <Container ref={this.myRef}>
        <BlocksWrapper>
          {content.map(block => {
            return (
              <RotatingCard
                image={block.image}
                text={block.text}
                displayState={this.state.cardOpen}
                peekCard={block.peekCard}
                key={block.text}
              />
            );
          })}
        </BlocksWrapper>
      </Container>
    );
  }
}

export default SectionTwo;
