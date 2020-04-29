import React from 'react';
import { Rating, Item } from 'semantic-ui-react';

function StoreCard({
    store
}) {

    const {store_name,operation_time,ratings,location} = store;

    return (
        <>
            <Item style={{maxWidth:450}}>
                <Item.Image size='small' src='/logo192.png' />

                <Item.Content verticalAlign='middle'>
                    <Item.Header>{store_name ? store_name : 'Unknown Store'}</Item.Header>
                    <Item.Meta>{operation_time ? operation_time : 'Unknown'}</Item.Meta>
                    <Item.Description>
                        ${location ? location : 'Unknown'}
                    </Item.Description>
                    <Item.Extra><Rating defaultRating={ratings} maxRating={5} disabled /></Item.Extra>
                    
                </Item.Content>
            </Item>
        </>
    );
}

export default StoreCard;