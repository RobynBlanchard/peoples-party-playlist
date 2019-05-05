import React from 'react';
import styled from 'styled-components';
import { colours, constants } from '../../../styles.js';
import ContentBlock from './ContentBlock';

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  width: 100%;
  height: 100%;
  background-color: rgba(51, 51, 51, 0.29);
`;

const ContentContainer = styled.div`
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  width: ${constants.mainContentContainerWidth};
  /* height: 200px; */
  height: 100%;
  align-items: center;
`;

class SectionTwo extends React.Component {
  // state = {
  //   cardOpen: false
  // }


  constructor(props) {
    super(props)
    this.myRef = React.createRef()   // Create a ref object
    this.state = {
      cardOpen: false
    }
  }

  listenScrollEvent = e => {
    if (window.scrollY > this.myRef.current.offsetTop - 200 ) {
      this.setState({cardOpen: true})
    } else {
      this.setState({cardOpen: false})
    }
  }

  componentDidMount() {
    window.addEventListener('scroll', this.listenScrollEvent)
  }
  render() {
    const content = [
      {
        image: '/disc.svg',
        text: 'Create your own playlist',
        position: 1,
      },
      {
        image: '/thumbs_up.svg',
        text: 'Upvote to move tracks up the playlist'
      },
      {
        image: '/thumbs_down.svg',
        text: 'Downvote to move tracks down the playlist'
      },
      {
        image: '/sad.svg',
        text: '5 downvotes will remove the track from the playlist'
      }
    ];
    return (
      <Wrapper  ref={this.myRef}>
        <ContentContainer>
          {content.map(block => {
            return (
              <ContentBlock
                image={block.image}
                text={block.text}
                displayState={this.state.cardOpen}
                position={block.position}
                key={block.text}
              />
            );
          })}
        </ContentContainer>
      </Wrapper>
    );
  }

};

export default SectionTwo;
