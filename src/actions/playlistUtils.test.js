import { updatedTrackNewPosition } from './playlistUtils';

describe('updatedTrackNewPosition', () => {
  describe('when the playlist is empty', () => {
    it('returns 0 as the new position', () => {
      const playlist = [];
      const newTrack = { song: 'Snow (Hey oh)', votes: 0 };
      const change = 1;

      const newPosition = updatedTrackNewPosition(playlist, newTrack, change);
      expect(newPosition).toEqual(0);
    });
  });

  describe('when the playlist is not empty', () => {
    const dateNow = new Date();

    const trackOne = {
      song: 'Do I wanna know?',
      votes: 3,
      updatedAt: dateNow - 30000
    };
    const trackTwo = {
      song: 'Snow (Hey oh)',
      votes: 2,
      updatedAt: dateNow - 10000
    };
    const trackThree = {
      song: 'All my life',
      votes: 1,
      updatedAt: dateNow - 40000
    };
    const trackFour = { song: 'Naive', votes: -1, updatedAt: dateNow - 50000 };

    const playlist = [trackOne, trackTwo, trackThree, trackFour];

    describe('when the updated track now has more votes than the track above it', () => {
      it('returns a positon one place higher', () => {
        const updatedTrackTwo = {
          song: 'Snow (Hey oh)',
          votes: 4,
          updatedAt: dateNow
        };
        const change = 2;

        const newPosition = updatedTrackNewPosition(
          playlist,
          updatedTrackTwo,
          change
        );
        expect(newPosition).toEqual(0);
      });
    });

    describe('when the updated track now has the least number of votes', () => {
      it('returns the bottom playlist position', () => {
        const updatedTrackTwo = {
          song: 'Snow (Hey oh)',
          votes: -2,
          updatedAt: dateNow
        };
        const change = -4;

        const newPosition = updatedTrackNewPosition(
          playlist,
          updatedTrackTwo,
          change
        );
        expect(newPosition).toEqual(3);
      });
    });

    describe('when the updated track now has less votes than the track below it', () => {
      it('returns a position one place lower', () => {
        const updatedTrackTwo = {
          song: 'Snow (Hey oh)',
          votes: 0,
          updatedAt: dateNow
        };
        const change = -2;

        const newPosition = updatedTrackNewPosition(
          playlist,
          updatedTrackTwo,
          change
        );
        expect(newPosition).toEqual(2);
      });
    });

    describe('when the updated track now has the same number of votes as the track above it', () => {
      it('the most recently updated track has the lower position', () => {
        const updatedTrack = {
          song: 'Do I wanna know?',
          votes: 3,
          updatedAt: dateNow
        };
        const change = 1;

        const newPosition = updatedTrackNewPosition(
          playlist,
          updatedTrack,
          change
        );
        expect(newPosition).toEqual(1);
      });
    });

    describe('when the updated track now has the same number of votes as the track below it', () => {
      it('the most recently updated track has the lower position', () => {
        const updatedTrack = {
          song: 'Do I wanna know?',
          votes: 1,
          updatedAt: dateNow
        };
        const change = -1;

        const newPosition = updatedTrackNewPosition(
          playlist,
          updatedTrack,
          change
        );
        expect(newPosition).toEqual(2);
      });
    });
  });
});
