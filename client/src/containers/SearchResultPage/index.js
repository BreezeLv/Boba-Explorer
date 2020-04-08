import React from 'react';
import SearchResultCard from '../../components/SearchResultCard';
import { CardGroup } from 'semantic-ui-react';
import SearchBar from '../../containers/SearchBar';

function SearchResultPage(props) {
    let searchResult = props.location.state.searchResult;
    console.log(searchResult);

    const searchCards = Object.entries(searchResult).map(([k,v])=><SearchResultCard key={k} product={v} />)
    
    return (
        <div>
            <SearchBar />
            <CardGroup centered={true}>
                {searchCards}
            </CardGroup>
        </div>
    );
}

export default SearchResultPage;