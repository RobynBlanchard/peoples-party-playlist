import React from 'react';
import styled from 'styled-components';
import { media } from '../../styles';

import MobileNav from './MobileNav';
import DesktopNav from './DesktopNav';

const DesktopNavContainer = styled.div`
  display: block;
  ${media.tablet`display: none;`}
`;

const MobileNavContainer = styled.div`
  display: none;
  ${media.tablet`display: block;`}
`;

const Nav = ({ token, userId }) => {
  return (
    <>
      <DesktopNavContainer>
        <DesktopNav token={token} userId={userId} />
      </DesktopNavContainer>
      <MobileNavContainer>
        <MobileNav token={token} />
      </MobileNavContainer>
    </>
  );
};

export default Nav;
