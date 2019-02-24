import React from 'react'
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Hamburger from './Hamburger';
import MobileNav from './MobileNav'

const NavContainer = styled.div`
  width: 100%;
  height: 50px;

  // @media (min-width: 480px) {
  
  //     & > List {
  //       display: block;
  //     }
  
  //     & > NarrowNav {
  //       display: none;
  //     }
  //   }
  }
`

const List = styled.ul`
  list-style-type: none;
  margin: 0;
  padding: 0;
  overflow: hidden;
  background-color: #333;

  @media (max-width: 700px) {
    display: none;
  }
`;

const ListItem = styled.li`
  float: left;
  border-right:1px solid #bbb;

  & > a {
    display: block;
    color: white;
    text-align: center;
    padding: 14px 16px;
    text-decoration: none;
  }

  & > a:hover {
    background-color: #111;
  }

  & > a:active {
    color: grey;
  }

  &:last-child {
    border-right: none;
    background-color: #1DB954;
    border-radius: 25px;
  }
`;

const NarrowNavContainer = styled.div` {
  & > i {
    float: left;
    cursor: pointer;
    color: #FFF;
  }

  @media (min-width: 700px) {
    display: none;
  }
`



//   .narrowLinks {
//     display: none;

//     a {
//       text-decoration: none;
//       display: block;
//       float: left;
//       clear: left;
//       padding: 0.5em 0;
//     }
//   }
// }

class Nav extends React.Component {
  constructor(props) {
    super(props);
    this.state = { mobileOpen: false  };
    this.handleToggle = this.handleToggle.bind(this);
  }

  handleToggle() {
    if (this.state.mobileOpen) {
      this.setState({mobileOpen: !this.state.mobileOpen})
    }
  }

  renderMobileNav() {
    return (
      
    )
  }

  render() {
    return (
      <NavContainer>
        <List>
          <ListItem><Link to="/">Playlists</Link></ListItem>
          <ListItem><Link to="/">Search</Link></ListItem>
          <ListItem style={{float:'right'}}><a href="/login">Login with Spotify</a></ListItem>
        </List> 
        <NarrowNavContainer>
         {/* <Hamburger onClick={() => this.handleToggle}/> */}
          <button onClick={this.handleToggle}><Hamburger/></button>
          <MobileNav open={this.state.mobileOpen} />
          
        </NarrowNavContainer> 
      </NavContainer>
    )
  }
};

export default Nav;
