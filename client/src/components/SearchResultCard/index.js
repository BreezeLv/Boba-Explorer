import React from 'react';

import { Card, Button } from 'react-bootstrap';

function SearchResultCard(props) {
    return (
        <>
            {/* TODO: Render a card display just like Yelp's search result */}
            {/*<h2>This is Search Result Card for {props.product.product_name ? props.product.product_name : 'Unknown Product'}</h2>*/}
            <Card style={{ width: '18rem' }}>
                {/*<Card.Img variant="top" src="holder.js/100px180" />*/}
                <Card.Body>
                    <Card.Title>Card Title</Card.Title>
                    <Card.Text>
                        This is Search Result Card for {props.product.product_name ? props.product.product_name : 'Unknown Product'}
                    </Card.Text>
                    <Button variant="primary">Go somewhere</Button>
                </Card.Body>
            </Card>
        </>
    );
}

export default SearchResultCard;