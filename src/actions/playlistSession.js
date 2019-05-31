import { START_SESSION } from './types';

export const startSession = () => {
  return {
    type: START_SESSION,
    payload: true
  }
};
