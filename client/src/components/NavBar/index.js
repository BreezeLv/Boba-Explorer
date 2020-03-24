import React from 'react';
import './index.css';

function NavBar() {
  return (
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
  );
}

export default NavBar;
