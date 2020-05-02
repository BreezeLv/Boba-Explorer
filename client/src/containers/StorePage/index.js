import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import { Menu, Item, ItemGroup, Header, Image, List, Label} from 'semantic-ui-react';

import {server_addr} from '../../const';

function StorePage() {
    const [store, setStore] = useState({});
    const { store_id, store_cover_url } = useParams();

    useEffect(() => {
        fetch(server_addr+'/store/'+store_id)
        .then(res => res.json())
        .then((res) => {
            res.store && setStore(res.store);
        })
        .catch(console.log)
    }, [store_id]);

    return (
        <>
            <Image src={store.store_cover_url} size='medium' centered={true} bordered={true} rounded={true} />
            <Header as={'h2'} block={true} color='green'> {store.store_name}</Header>
            <List divided selection>
                <List.Item>
                  <Label color='blue' horizontal>
                    Open Time
                  </Label>
                    {store.operation_time}
                </List.Item>
                <List.Item>
                  <Label color='pink' horizontal>
                    Address
                  </Label>
                  {store.location}
                </List.Item>
            </List>
        </>
    );
}

export default StorePage;