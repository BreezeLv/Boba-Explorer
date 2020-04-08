import React from 'react';
import { Card, Image, Button } from 'semantic-ui-react';

function SearchResultCard(props) {
    return (
        <>
            <Card>
                <Image src='/logo192.png' wrapped ui={false} />
                <Card.Content>
                    <Card.Header>{props.product.product_name ? props.product.product_name : 'Unknown Product'}</Card.Header>
                    <Card.Meta>
                        <span className='date'>{props.product.size ? props.product.size : 'Regular'}</span>
                    </Card.Meta>
                    <Card.Description>
                        ${props.product.price ? props.product.price : 'Unknown Price'}
                    </Card.Description>
                </Card.Content>
                <Card.Content extra>
                    <Button>Learn More Here!</Button>
                </Card.Content>
            </Card>
        </>
    );
}

export default SearchResultCard;