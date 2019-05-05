import styled, { css } from 'styled-components';

export const colours = {
  spotifyGreen: '#1DB954',
  spotifyBlack: '#191414',
  spotifyWhite: '#FFFFFF',
  grey: '#333'
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
