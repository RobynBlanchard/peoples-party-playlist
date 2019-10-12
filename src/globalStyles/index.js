import styled, { css } from 'styled-components';

export const colours = {
  spotifyGreen: '#1DB954',
  darkGreen: '#106c31',
  spotifyBlack: '#191414',
  spotifyWhite: '#FFFFFF',
  grey: '#333',
  black: '#191414',
  primaryDark: '#212121',
  primaryLight: '#424242',
  primaryLightRGBA: '66, 66, 66',
  secondaryDark: '#bdbdbd',
  secondaryLight: '#e0e0e0'
};

export const constants = {
  mainContentContainerWidth: '1280px'
};

export const fonts = {
  title: 'Righteous, cursive;',
  font1: 'Lucida Sans Unicode, Lucida Grande, sans-serif;'
};

const sizes = {
  desktop: 992,
  tablet: 768,
  phone: 691
};

// Iterate through the sizes and create a media template
export const media = Object.keys(sizes).reduce((acc, label) => {
  acc[label] = (...args) => css`
    @media (max-width: ${sizes[label] / 16}em) {
      ${css(...args)}
    }
  `;

  return acc;
}, {});

export const Container = styled.div`
  width: 70%;
  ${media.desktop`
  width: 95%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`}
`;

export const DefaultButton = styled.button`
  background: none;
  color: inherit;
  border: none;
  padding: 0;
  font: inherit;
  cursor: pointer;
  outline: inherit;
`;
