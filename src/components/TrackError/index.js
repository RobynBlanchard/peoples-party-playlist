import React from 'react';
import styled from 'styled-components';
import Expire from '../Expire';

const ErrorMessage = styled.p`
    color: lightgrey;
    line-height: 0;
    padding: 0;
    margin: 0;
    font-size: 14px;
`;

const TrackError = ({ text }) => {
  return (
    <tr>
      <td>
        <Expire delay={2000}>
            <ErrorMessage>
              <img
                src="images/exclamation-mark.svg"
                style={{ height: '20px' }}
              />{' '}
              {text}
            </ErrorMessage>
        </Expire>
      </td>
    </tr>
  );
};

export default TrackError;
