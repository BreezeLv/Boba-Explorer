import React from 'react';
import SearchResultCard from '../../components/SearchResultCard';


function SearchResultPage(props) {
    let searchResult = props.location.state.searchResult;
    console.log(searchResult);

    const searchCards = Object.entries(searchResult).map(([k,v])=><SearchResultCard key={k} product={v} />)
    
    return (
        <div>
            <h1>THIS IS SEARCH RESULT PAGE</h1>
            {searchCards}
        </div>
    );
}

export default SearchResultPage;