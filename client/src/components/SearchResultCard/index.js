import React from 'react';
import { Button, Item } from 'semantic-ui-react';

function SearchResultCard(props) {
    return (
        <>
            <Item>
                <Item.Image size='small' src='/logo192.png' />

                <Item.Content verticalAlign='middle'>
                    <Item.Header>{props.product.product_name ? props.product.product_name : 'Unknown Product'}</Item.Header>
                    <Item.Meta>{props.product.size ? props.product.size : 'Regular'}</Item.Meta>
                    <Item.Description>
                        ${props.product.price ? props.product.price : 'Unknown Price'}
                    </Item.Description>
                    <Item.Extra as='a'>From teamoji</Item.Extra>
                    <Item.Extra><Button color='teal' style={{marginRight:0}}>Write a review</Button></Item.Extra>
                </Item.Content>
            </Item>
        </>
    );
}

export default SearchResultCard;