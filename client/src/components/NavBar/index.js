import React from 'react';
import './index.css';
import styled from 'styled-components';
import { Button, Label, Icon } from 'semantic-ui-react';

function NavBar({
  logoutHandler,
  login,
  userData
}) {

  const FlexContainer = styled.div`
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin: 0 0;
    font-size: 12px;
	  font-family: sans-serif;
    background: #2c3e50;
    position: relative;
  `;

  const LoginGadget = login ? (<Label><Icon name='user circle' /> {userData.username} <Label as='a' onClick={logoutHandler}>Logout</Label></Label>) : (<><Button inverted color='blue' href='/login'>Log In</Button> <Button inverted color='olive' href='/register'>Register</Button></>);

  return (
    <FlexContainer>

      <div className='logo-container'>
        <a href='/'>
          <img className='navbar_logo' src='logo192.png' alt='logo'/>
        </a>
      </div>

      <div className='navbar-container'>
          <nav id='colorful_nav'>
              <a href="/">Home</a>
              <a href="explore">Explore</a>
              <a href="review">Review</a>
              <a href="community">Community</a>
              <a href="contact">Contact</a>
              <div className="animation"></div>
          </nav>
      </div>

      <div className='login-container'>
        {LoginGadget}
      </div>

    </FlexContainer>
  );
}

export default NavBar;
