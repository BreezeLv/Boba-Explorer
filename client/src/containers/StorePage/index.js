import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
// import { ItemGroup, Menu } from 'semantic-ui-react';

import {server_addr} from '../../const';

function StorePage() {
    const [store, setStore] = useState({});
    const { store_id } = useParams();

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
            <h1>{store_id}</h1>
            {Object.keys(store).length !== 0 && (
                <>
                    <h2>{store.store_name}</h2>
                    <h3>{store.location}</h3>
                </>
            )}
        </>
    );
}

export default StorePage;