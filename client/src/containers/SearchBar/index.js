import React from 'react';
import { Redirect } from 'react-router';

import './index.css';
import {server_addr} from '../../const';

class SearchBar extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            searchInput : '',
            redirect : false,
            searchResult : {}
        };
    }

    onChangeSearchField = (e) => {
        this.setState({searchInput:e.target.value});
    }

    onSearch = () => {
        const query_url = 'q='+this.state.searchInput;

        fetch(server_addr+'/search?'+query_url)
        .then(res => res.json())
        .then((res) => {
            console.log(res)
            // this.props.history.push(query_url)
            this.setState({redirect:true, searchResult:res, query_url:query_url});
        })
        .catch(console.log)
    }

    render() {
        if (this.state.redirect) {
            return <Redirect push to={{
                pathname : "/search",
                search : this.state.query_url,
                state : {searchResult:this.state.searchResult}
            }}/>;
        }

        return (
            <div className='search-bar-wrapper'>
                <span className='search-bar-label'>Find</span>
                <span>
                    <input id='search-bar-input' placeholder='Boba tea, Boba Store...' onChange={this.onChangeSearchField} />
                </span>
                <button id='search-btn' onClick={this.onSearch}>
                    <svg height="24" viewBox="0 0 24 24" width="24"><path d="M20.753 19.34l-4.295-4.297A7.46 7.46 0 0 0 18 10.5a7.5 7.5 0 1 0-7.5 7.5 7.46 7.46 0 0 0 4.543-1.542l4.296 4.295a1 1 0 1 0 1.412-1.414zM10.5 16A5.506 5.506 0 0 1 5 10.5C5 7.467 7.467 5 10.5 5S16 7.467 16 10.5 13.533 16 10.5 16z"></path></svg>
                </button>
            </div>
        );
    }
}

export default SearchBar;