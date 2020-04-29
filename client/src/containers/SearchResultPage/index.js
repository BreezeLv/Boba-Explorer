import React from 'react';
import SearchResultCard from '../../components/SearchResultCard';
import { ItemGroup } from 'semantic-ui-react';
import SearchBar from '../../containers/SearchBar';

function SearchResultPage(props) {
    let searchResult = props.location.state.searchResult;
    console.log(searchResult);

    const searchCards = Object.entries(searchResult).map(([k,v])=><SearchResultCard key={k} product={v} />)
    
    return (
        <>
            <SearchBar />
            <ItemGroup divided={true} style={{ maxWidth: 500, margin: '1.5em auto' }}>
                {searchCards}
            </ItemGroup>
        </>
    );
}

export default SearchResultPage;