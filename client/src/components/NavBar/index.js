import React from 'react';
import './index.css';
import styled from 'styled-components';
import { Button, Label, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

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

  const LoginGadget = login ? 
  (<Label><Icon name='user circle' /> {userData.username} <Label as='a' onClick={logoutHandler}>Logout</Label></Label>) : 
  (<><Link to='/login'><Button inverted color='blue'>Log In</Button></Link> <Link to='/register'><Button inverted color='olive'>Register</Button></Link></>);

  return (
    <FlexContainer>

      <div className='logo-container'>
        <Link to='/'>
          <img className='navbar_logo' src='logo192.png' alt='logo'/>
        </Link>
      </div>

      <div className='navbar-container'>
          <nav id='colorful_nav'>
              <Link to="/">Home</Link>
              <Link to="explore">Explore</Link>
              <Link to="review">Review</Link>
              <Link to="community">Community</Link>
              <Link to="contact">Contact</Link>
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
