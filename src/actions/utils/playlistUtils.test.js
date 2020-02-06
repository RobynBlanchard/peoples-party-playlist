import { spotifyOffSet, updatedTrackNewPosition, updateTrackApi } from './playlistUtils';

describe('spotifyOffSet', () => {
  it('returns the number of removed tracks plus the number of locked tracks', () => {
    expect(spotifyOffSet([1, 2, 3], [4])).toEqual(4);
  });
});

describe('updatedTrackNewPosition', () => {
  it('returns 0 when playlist is empty', () => {
    const playlist = [];
    const track = { uri: '1', votes: 0 };
    const change = 1;

    expect(updatedTrackNewPosition(playlist, track, change)).toEqual(0);
  });

  describe('when the track was upvoted', () => {
    const change = 1;

    describe('when the track does not have the same number of votes as another track', () => {
      it('returns the new position of the track where it is higher in the playlist than the tracks with less votes', () => {
        const playlist = [
          { uri: '1', votes: 8 },
          { uri: '2', votes: 4 }
        ];
        const track = { uri: '3', votes: 6 };

        expect(updatedTrackNewPosition(playlist, track, change)).toEqual(1);
      });
    });

    describe('when the track has the same number of votes as another track', () => {
      it('returns the new position of the track where it is higher in the playlist than the tracks with less votes but lower than tracks with the same number of votes', () => {
        const dateNow = Date.now();
        const datePast = dateNow - 30000;
        const playlist = [{ uri: '1', votes: 6, updatedAt: datePast }];
        const track = { uri: '3', votes: 6, updatedAt: dateNow };

        expect(updatedTrackNewPosition(playlist, track, change)).toEqual(1);
      });
    });
  });

  describe('when the track was down-voted', () => {
    const change = -1;

    describe('when the track does not have the same number of votes as another track', () => {
      it('returns the new position of the track where it is lower in the playlist than the tracks with more votes', () => {
        const playlist = [
          { uri: '1', votes: 8 },
          { uri: '2', votes: 4 }
        ];
        const track = { uri: '3', votes: 3 };

        expect(updatedTrackNewPosition(playlist, track, change)).toEqual(2);
      });
    });

    describe('when the track has the same number of votes as another track', () => {
      it('returns the new position of the track where it is lower in the playlist than the tracks with more votes but lower than tracks with the same number of votes', () => {
        const dateNow = Date.now();
        const datePast = dateNow - 30000;
        const playlist = [{ uri: '1', votes: 6, updatedAt: datePast }];
        const track = { uri: '3', votes: 6, updatedAt: dateNow };

        expect(updatedTrackNewPosition(playlist, track, change)).toEqual(1);
      });
    });
  })
});
