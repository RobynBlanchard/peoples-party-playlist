import VoteDetails from './index';
import { mount } from 'enzyme';
import { Wrapper, VotesText, Icon } from './styles';
import React from 'react';
import { DefaultButton } from '../../globalStyles';
import {
  upVoteLimit,
  downVoteLimit,
  minimumVotes
} from '../../utils/constants';

jest.mock('../../utils/constants', () => ({
  upVoteLimit: 3,
  downVoteLimit: 2,
  minimumVotes: -2
}));

describe('VoteDetails', () => {
  let wrapper;
  let mockProps = {
    position: 0,
    uri: '123',
    votes: 0,
    handleUpVote: jest.fn(),
    handleDownVote: jest.fn(),
    removeTrack: jest.fn(),
    upVoters: {},
    downVoters: {},
    userId: 'a1',
    shouldFocus: false,
    upVoteLimitExceeded: jest.fn(),
    downVoteLimitExceeded: jest.fn()
  };

  describe('when the user tries upvote more than the limit', () => {
    let mockupVoteLimitExceeded;

    describe('when the user has never upvoted before', () => {
      beforeEach(() => {
        mockupVoteLimitExceeded = jest.fn();
        mockProps = {
          ...mockProps,
          votes: 0,
          upVoteLimitExceeded: mockupVoteLimitExceeded
        };

        wrapper = mount(<VoteDetails {...mockProps} />);
        const upVoteButton = wrapper.find(DefaultButton).at(1);
        Array.from(Array(upVoteLimit + 1)).forEach(_ =>
          upVoteButton.simulate('click')
        );
      });

      it('displays the right number of votes', () => {
        expect(wrapper.find(VotesText).text()).toEqual('3');
      });

      it('upVoteLimitExceeded is called with the position of the track', () => {
        expect(mockupVoteLimitExceeded).toHaveBeenCalled();
        expect(mockupVoteLimitExceeded).toHaveBeenCalledWith(0);
      });
    });

    describe('when the user has upvoted before', () => {
      describe('when the user has not already reached the upvote limit', () => {
        beforeEach(() => {
          mockupVoteLimitExceeded = jest.fn();
          mockProps = {
            ...mockProps,
            votes: 2,
            upVoters: { a1: upVoteLimit - 1 },
            upVoteLimitExceeded: mockupVoteLimitExceeded
          };
          wrapper = mount(<VoteDetails {...mockProps} />);
          const upVoteButton = wrapper.find(DefaultButton).at(1);
          Array.from(Array(2)).forEach(_ => upVoteButton.simulate('click'));
        });

        it('upVoteLimitExceeded is called with the position of the track', () => {
          expect(mockupVoteLimitExceeded).toHaveBeenCalled();
          expect(mockupVoteLimitExceeded).toHaveBeenCalledWith(0);
        });

        it('displays the right number of votes', () => {
          expect(wrapper.find(VotesText).text()).toEqual('3');
        });
      });
      describe('when the user has already reached the upvote limit', () => {
        beforeEach(() => {
          mockupVoteLimitExceeded = jest.fn();
          mockProps = {
            ...mockProps,
            votes: 3,
            upVoters: { a1: upVoteLimit },
            upVoteLimitExceeded: mockupVoteLimitExceeded
          };
          wrapper = mount(<VoteDetails {...mockProps} />);
          const upVoteButton = wrapper.find(DefaultButton).at(1);
          upVoteButton.simulate('click');
        });

        it('upVoteLimitExceeded is called with the position of the track', () => {
          expect(mockupVoteLimitExceeded).toHaveBeenCalled();
          expect(mockupVoteLimitExceeded).toHaveBeenCalledWith(0);
        });

        it('displays the right number of votes', () => {
          expect(wrapper.find(VotesText).text()).toEqual('3');
        });
      });
    });
  });

  describe('when the user tries to downvote more than the limit', () => {
    let mockupDownVoteLimitExceeded;

    describe('when the user has never downvoted before', () => {
      beforeEach(() => {
        mockupDownVoteLimitExceeded = jest.fn();
        mockProps = {
          ...mockProps,
          votes: 0,
          upVoters: {},
          downVoters: {},
          downVoteLimitExceeded: mockupDownVoteLimitExceeded
        };

        wrapper = mount(<VoteDetails {...mockProps} />);

        const downVoteButton = wrapper.find(DefaultButton).at(0);
        Array.from(Array(downVoteLimit + 1)).forEach(_ =>
          downVoteButton.simulate('click')
        );
      });

      it('displays the right number of votes', () => {
        expect(wrapper.find(VotesText).text()).toEqual('-2');
      });

      it('downVoteLimitExceeded is called with the position of the track', () => {
        expect(mockupDownVoteLimitExceeded).toHaveBeenCalled();
        expect(mockupDownVoteLimitExceeded).toHaveBeenCalledWith(0);
      });
    });

    describe('when the user has downvoted before', () => {
      describe('when the user has not already reached the downvote limit', () => {
        beforeEach(() => {
          mockupDownVoteLimitExceeded = jest.fn();
          mockProps = {
            ...mockProps,
            votes: -1,
            downVoters: { a1: downVoteLimit - 1 },
            upVoters: {},

            downVoteLimitExceeded: mockupDownVoteLimitExceeded
          };
          wrapper = mount(<VoteDetails {...mockProps} />);
          const downVoteButton = wrapper.find(DefaultButton).at(0);

          Array.from(Array(2)).forEach(_ => downVoteButton.simulate('click'));
        });

        it('downVoteLimitExceeded is called with the position of the track', () => {
          expect(mockupDownVoteLimitExceeded).toHaveBeenCalled();
          expect(mockupDownVoteLimitExceeded).toHaveBeenCalledWith(0);
        });

        it('displays the right number of votes', () => {
          expect(wrapper.find(VotesText).text()).toEqual('-2');
        });
      });
      describe('when the user has already reached the downvote limit', () => {
        beforeEach(() => {
          mockupDownVoteLimitExceeded = jest.fn();
          mockProps = {
            ...mockProps,
            votes: -1,
            downVoters: { a1: downVoteLimit },
            downVoteLimitExceeded: mockupDownVoteLimitExceeded
          };
          wrapper = mount(<VoteDetails {...mockProps} />);
          const downVoteButton = wrapper.find(DefaultButton).at(0);
          downVoteButton.simulate('click');
        });

        it('downVoteLimitExceeded is called with the position of the track', () => {
          expect(mockupDownVoteLimitExceeded).toHaveBeenCalled();
          expect(mockupDownVoteLimitExceeded).toHaveBeenCalledWith(0);
        });

        it('displays the right number of votes', () => {
          expect(wrapper.find(VotesText).text()).toEqual('-1');
        });
      });
    });
  });

  describe('when downvoting sets the track votes below the minimum required to stay on the playlist', () => {
    let mockRemoveTrack;
    beforeEach(() => {
      mockRemoveTrack = jest.fn();
      mockProps = {
        ...mockProps,
        votes: minimumVotes,
        removeTrack: mockRemoveTrack,
        upVoters: {},
        downVoters: {}
      };
      wrapper = mount(<VoteDetails {...mockProps} />);
      const downVoteButton = wrapper.find(DefaultButton).at(0);
      downVoteButton.simulate('click');
    });

    it('removeTrack is called with the position and uri of the track', () => {
      expect(mockRemoveTrack).toHaveBeenCalled();
      expect(mockRemoveTrack).toHaveBeenCalledWith('123', 0);
    });
  });
});
