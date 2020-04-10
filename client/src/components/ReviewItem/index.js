import React from 'react';
import { Button, Item, Icon } from 'semantic-ui-react';

export default function ReviewItem(props) {

    const {review} = props;
    console.log(review);

    return (
        <>
            <Item>
                    <Item.Image size='tiny'><Icon name='user'>userX</Icon></Item.Image>

                    <Item.Content verticalAlign='middle'>
                        <Item.Description>
                            {review.review_content ? review.review_content : 'Unknown Review'}
                        </Item.Description>
                        
                    </Item.Content>
                </Item>
        </>
    );
}