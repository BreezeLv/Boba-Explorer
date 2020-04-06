import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import { Card, Button, CardGroup } from 'react-bootstrap';

function SearchResultCard(props) {
    return (
        <>
            {/* TODO: Render a card display just like Yelp's search result */}
            {/*<h2>This is Search Result Card for {props.product.product_name ? props.product.product_name : 'Unknown Product'}</h2>*/}
            <CardGroup>
                <Card
                  border = 'light'
                  bg = 'light'
                  text = 'secondary'
                  style={{ width: '18rem' }}
                  >
                    {/*<Card.Img variant="top" src="holder.js/100px180" />*/}
                    <Card.Body>
                        <Card.Title>
                            {props.product.product_name ? props.product.product_name : 'Unknown Product'}
                        </Card.Title>
                        <Card.Text>
                            ${props.product.price ? props.product.price : 'Unknown Product'}     {props.product.size ? props.product.size : 'Unknown Product'}
                        </Card.Text>
                        <Button variant="primary">Learn More Here!</Button>
                    </Card.Body>
                </Card>
                <br />
            </CardGroup>
            <br />
        </>
    );
}

export default SearchResultCard;