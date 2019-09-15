import React from 'react';
import Truncate from 'react-truncate';
import {
  Cell,
  MobileName,
  MobileArtist,
  MobileRow,
  DesktopRow,
  NameCell,
  ArtistCell,
  CTACell
} from './styles';

const Track = ({ name, artist, children, isLocked, shouldFocus }) => {
  const truncate = text => (
    <Truncate lines={1} ellipsis={'...'}>
      {text}
    </Truncate>
  );

  return (
    <>
      <MobileRow shouldFocus={shouldFocus}>
        <Cell hasBorder={!isLocked}>
          <MobileName>{truncate(name)}</MobileName>
          <br />
          <MobileArtist shouldFocus={shouldFocus}>
            {truncate(artist)}
          </MobileArtist>
        </Cell>
        <Cell hasBorder={!isLocked}>{children}</Cell>
      </MobileRow>

      <DesktopRow shouldFocus={shouldFocus}>
        <NameCell hasBorder={!isLocked}>{truncate(name)}</NameCell>
        <ArtistCell hasBorder={!isLocked}>{truncate(artist)}</ArtistCell>
        <CTACell hasBorder={!isLocked}>{children}</CTACell>
      </DesktopRow>
    </>
  );
};

export default Track;
