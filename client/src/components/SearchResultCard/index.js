import React from 'react';

function SearchResultCard(props) {
    return (
        <>
            {/* TODO: Render a card display just like Yelp's search result */}
            <h2>This is Search Result Card for {props.product.product_name ? props.product.product_name : 'Unknown Product'}</h2>
        </>
    );
}

export default SearchResultCard;