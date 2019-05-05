import React from 'react';
import {
  Container,
  DesktopDetails,
  Song,
  Artist,
  MobileDetails,
  SongMobile,
  ArtistMobile,
  VotesContent,
  VotesText,
  Button,
  Icon
} from './styles';

const trimText = (text, length) =>
  text.length > length ? `${text.slice(0, length)}...` : text;

const Track = ({
  song,
  artist,
  votes,
  id,
  position,
  uri,
  handleUpVote,
  handleDownVote
}) => {
  const trimmedSong = trimText(song, 32);
  const trimmedArtist = trimText(artist, 24);

  return (
    <Container>
      <DesktopDetails>
        <Song>{trimmedSong}</Song>
        <Artist>{trimmedArtist}</Artist>
      </DesktopDetails>

      <MobileDetails>
        <SongMobile>{trimmedSong}</SongMobile>
        <ArtistMobile>{trimmedArtist}</ArtistMobile>
      </MobileDetails>

      <VotesContent>
        <Button onClick={() => handleDownVote(id, position, uri)}>
          <Icon src="images/minus.svg" />
        </Button>
        <VotesText>{votes}</VotesText>
        <Button onClick={() => handleUpVote(id, position)}>
          <Icon src="images/plus.svg" />
        </Button>
      </VotesContent>
    </Container>
  );
};

export default Track;
