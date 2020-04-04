import React from 'react';
import './index.css';
import styled from 'styled-components';
import { Button } from 'semantic-ui-react';

function NavBar() {

  const FlexContainer = styled.div`
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin: 0 0;
    font-size: 12px;
	  font-family: sans-serif;
    background: #2c3e50;
  `;

  return (
    <FlexContainer>

      <div className='logo-container'>
        <a href='/'>
          <img className='navbar_logo' src='logo192.png' alt='logo'/>
        </a>
      </div>

      <div className='navbar-container'>
          <nav>
              <a href="/">Home</a>
              <a href="explore">Explore</a>
              <a href="review">Review</a>
              <a href="community">Community</a>
              <a href="contact">Contact</a>
              <div className="animation"></div>
          </nav>
      </div>

      <div className='login-container'>
        <Button inverted color='blue' onClick={()=>console.log("someone wants to login")}>Log In</Button>
        <Button inverted color='olive' onClick={()=>console.log("someone wants to login")}>Register</Button>
      </div>

    </FlexContainer>
  );
}

export default NavBar;
