import {
  spotifyOffSet,
  updatedTrackNewPosition,
  updateTrackApi,
  findPositionForNewTrack
} from './playlistUtils';

describe('spotifyOffSet', () => {
  it('returns the number of removed tracks plus the number of locked tracks', () => {
    expect(spotifyOffSet([1, 2, 3], [4])).toEqual(4);
  });
});

// update track position
describe('updatedTrackNewPosition', () => {
  // describe('when the track was not on the playlist', () => {
  //   it('returns 0 when playlist is empty', () => {
  //     const playlist = [];
  //     const track = { uri: '1', votes: 0 };
  //     const change = 1;

  //     expect(updatedTrackNewPosition(playlist, track, change)).toEqual(0);
  //   });

  // })

  describe('when the track was upvoted', () => {
    const change = 1;

    describe('when the new number of votes for the track is not higher than any tracks above it', () => {
      it('does not change position', () => {
        const playlist = [
          { uri: '1', votes: 2 },
          { uri: '2', votes: 0 },
          { uri: '3', votes: -1 }
        ];

        const updatedTrack = { uri: '2', votes: 1 };
        expect(updatedTrackNewPosition(playlist, updatedTrack, change)).toEqual(
          1
        );
      });
    });

    describe('when the updated track now has more votes than the track above it', () => {
      it('returns a higher position than before', () => {
        const playlist = [
          { uri: '1', votes: 2 },
          { uri: '2', votes: 0 },
          { uri: '3', votes: -1 }
        ];

        const updatedTrack = { uri: '2', votes: 3 };
        expect(updatedTrackNewPosition(playlist, updatedTrack, change)).toEqual(
          0
        );
      });
    });

    describe('when the updated track now has the same number of votes as the track above it', () => {
      it('returns a position immediately below the tracks with the same number of votes', () => {
        const dateNow = Date.now();
        const datePast = dateNow - 30000;
        const playlist = [
          { uri: '1', votes: 2, updatedAt: datePast },
          { uri: '2', votes: 0, updatedAt: datePast }
        ];

        const updatedTrack = { uri: '2', votes: 2, updatedAt: dateNow };
        expect(updatedTrackNewPosition(playlist, updatedTrack, change)).toEqual(
          1
        );
      });
    });
  });

  describe('when the track was down-voted', () => {
    const change = -1;

    describe('when the new number of votes for the track is not lower than any tracks below it', () => {
      it('does not change position', () => {
        const playlist = [
          { uri: '1', votes: 2 },
          { uri: '2', votes: 0 },
          { uri: '3', votes: -2 }
        ];

        const updatedTrack = { uri: '2', votes: -1 };
        expect(updatedTrackNewPosition(playlist, updatedTrack, change)).toEqual(
          1
        );
      });
    });

    describe('when the updated track now has less votes than the track below it', () => {
      it('returns a position immediately below the tracks with more votes', () => {
        const playlist = [
          { uri: '1', votes: 2 },
          { uri: '2', votes: 0 },
          { uri: '3', votes: -1 }
        ];

        const updatedTrack = { uri: '2', votes: -2 };
        expect(updatedTrackNewPosition(playlist, updatedTrack, change)).toEqual(
          2
        );
      });
    });

    describe('when the updated track now has the same number of votes as tracks below it', () => {
      it('returns a position immediately below the tracks with the same number of votes', () => {
        const dateNow = Date.now();
        const datePast = dateNow - 30000;
        const playlist = [
          { uri: '1', votes: 2, updatedAt: datePast },
          { uri: '2', votes: 0, updatedAt: datePast }
        ];

        const updatedTrack = { uri: '1', votes: 0, updatedAt: dateNow };
        expect(updatedTrackNewPosition(playlist, updatedTrack, change)).toEqual(
          1
        );
      });
    });
  });
});

describe('findPositionForNewTrack', () => {
  it('returns 0 when the playlist is empty', () => {
    expect(findPositionForNewTrack([])).toEqual(0);
  });

  describe('when there are no other tracks with 0 votes', () => {
    it('returns a position below tracks with more than 0 votes and above tracks with less than 0 votes', () => {
      const playlist = [
        { uri: '1', votes: 1 },
        { uri: '2', votes: -1 }
      ];
      expect(findPositionForNewTrack(playlist)).toEqual(1);
    });
  });

  describe('when there are other tracks with 0 votes', () => {
    it('return a position directly below the last track with 0 votes', () => {
      const playlist = [
        { uri: '1', votes: 0 },
        { uri: '2', votes: -1 }
      ];
      expect(findPositionForNewTrack(playlist)).toEqual(1);
    });
  });
});

describe('updatedTrackVotes', () => {});
