import React from 'react';
import { Helmet } from 'react-helmet';
import './index.css';

export function HomePage() {

  return (
    <>
        <Helmet>
        <title>Home Page</title>
        <meta
            name="description"
            content="Boba Explorer homepage"
        />
        </Helmet>

        <div className='search-view-container'>
            <div className='content-container'>
                <h1>Boba Explorer</h1>
                <div>
                    <div className='search-bar-wrapper'>
                        <span className='search-bar-label'>Find</span>
                        <span>
                            <input id='search-bar-input' placeholder='Boba tea, Boba Store...'/>
                        </span>
                        <button id='search-btn'>
                            <svg id="24x24_search" height="24" viewBox="0 0 24 24" width="24"><path d="M20.753 19.34l-4.295-4.297A7.46 7.46 0 0 0 18 10.5a7.5 7.5 0 1 0-7.5 7.5 7.46 7.46 0 0 0 4.543-1.542l4.296 4.295a1 1 0 1 0 1.412-1.414zM10.5 16A5.506 5.506 0 0 1 5 10.5C5 7.467 7.467 5 10.5 5S16 7.467 16 10.5 13.533 16 10.5 16z"></path></svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>

    </>
  );
}

export default HomePage;
