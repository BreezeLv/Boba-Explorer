import React from 'react';
import { Button, Item } from 'semantic-ui-react';

export default function ReviewItem() {

    const {review} = this.props;
    console.log(review);

    return (
        <>
            <Item>
                    <Item.Image size='small' src='/logo192.png' />

                    <Item.Content verticalAlign='middle'>
                        <Item.Description>
                            ${review ? review : 'Unknown Review'}
                        </Item.Description>
                        
                    </Item.Content>
                </Item>
        </>
    );
}