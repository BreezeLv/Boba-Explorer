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

        <header className="App-header">
            <p>HomePage ---> To be filled in</p>
        </header>

    </>
  );
}

export default HomePage;
