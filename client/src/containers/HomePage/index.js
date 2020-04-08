import React from 'react';
import { Helmet } from 'react-helmet';
import './index.css';
import SearchBar from '../../containers/SearchBar';

class HomePage extends React.Component {

    render() {
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
                            <SearchBar />
                        </div>
                    </div>
                </div>

            </>
        );
    }
}

export default HomePage;
