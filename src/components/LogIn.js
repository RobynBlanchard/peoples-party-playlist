import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";

import { fetchUser } from "../actions/";
import { colours } from '../styles.js';

const LogInButton = styled.a`
  height: 100%;
  display: block;
  color: white;
  text-align: center;
  vertical-align: middle;
  text-decoration: none;

  & > img {
    height: 20px;
    width: 20px;
    float: right;
  }
`;

const DropDownLink = styled.a`
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
  text-align: left;
`;

const DropDownContent = styled.div`
  display: none;
  position: absolute;
  min-width: 100px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
  margin-top: 15px;
`;

const LinkContainer = styled.div`
  height: 100%;
  border-right: none;
  display: block;
  color: white;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
  width: 75px;
  border-left: 1px solid #bbb;

  &:hover {
    background-color: ${colours.spotifyBlack};
    ${DropDownContent} {
      display: block;
      /* margin-left:-16px; */
    }
  }
`;

class LogIn extends React.Component {
  componentDidMount() {
    const { userId, fetchUser } = this.props;

    if (!userId) fetchUser();
  }

  renderAuthButton() {
    const { userId } = this.props;
    if (this.props.signedIn) {
      return (
        <LinkContainer>
          {userId === "" ? "user" : userId}
          <DropDownContent>
            <DropDownLink href="/change-user">Change User</DropDownLink>
            <DropDownLink href="/log-out">Log out</DropDownLink>
          </DropDownContent>
        </LinkContainer>
      );
    }
    return (
      <LinkContainer>
        <LogInButton href="/login">Login<img src="http://localhost:3000/images/Spotify_Icon_RGB_Green.png" /></LogInButton>
        
      </LinkContainer>
    );
  }

  render() {
    return <div>{this.renderAuthButton()}</div>;
  }
}

LogIn.serverFetch = fetchUser;

const mapStateToProps = state => {
  return {
    signedIn: state.auth.signedIn,
    token: state.auth.token,
    userId: state.auth.userId
  };
};

export default connect(
  mapStateToProps,
  { fetchUser }
)(LogIn);
