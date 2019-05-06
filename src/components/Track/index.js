import React from 'react';
import {
  Container,
  DesktopDetails,
  SongDesktop,
  ArtistDesktop,
  MobileDetails,
  SongMobile,
  ArtistMobile
} from './styles';

const trimText = (text, length) =>
  text.length > length ? `${text.slice(0, length)}...` : text;

const Track = ({ name, artist, children, lockedStatus }) => {
  const trimmedSong = trimText(name, 32);
  const trimmedArtist = trimText(artist, 24);

  const locked =
    lockedStatus === 'playingAndlocked' || lockedStatus === 'pausedAndLocked';

  return (
    <Container lockedTrack={locked}>
      <DesktopDetails>
        <SongDesktop>{trimmedSong}</SongDesktop>
        <ArtistDesktop>{trimmedArtist}</ArtistDesktop>
      </DesktopDetails>

      <MobileDetails>
        <SongMobile>{trimmedSong}</SongMobile>
        <ArtistMobile>{trimmedArtist}</ArtistMobile>
      </MobileDetails>
      {children}
    </Container>
  );
};

export default Track;
