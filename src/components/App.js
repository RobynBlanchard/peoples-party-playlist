import { Switch, Route } from 'react-router-dom';
import React from 'react';
import styled from 'styled-components';

import Home from './Home';
import Nav from './Nav';

const AppContainer = styled.div`
  /* display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  width: 100%;
  height: 100%;
  font-size: 40px;
  background: linear-gradient(20deg, rgb(219, 112, 147), #daa357); */

  margin-right: auto; /* 1 */
  margin-left:  auto; /* 1 */

  max-width: 960px; /* 2 */

  font-family: "Lucida Sans Unicode", "Lucida Grande", sans-serif;

  /* padding-right: 10px; /* 3 */
  /* padding-left:  10px; */
  /* border: solid red 5px; */
`

class App extends React.Component {
  render() {
    return (
      // <div>
      <AppContainer>
        <Nav />
        {/* <Switch>
          <Route path="/" exact component={Home} />
        </Switch> */}
        </AppContainer>
      // </div>
    );
  }
}

export default App;
