import React from 'react';
import { ItemGroup } from 'semantic-ui-react';

import {server_addr} from '../../const';
import StoreCard from '../../components/StoreCard';

class ExplorePage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            stores : []
        };
    }

    UNSAFE_componentWillMount() {
        fetch(server_addr+'/fetch-stores')
        .then(res => res.json())
        .then((res) => {
            this.setState({stores:res.stores});
        })
        .catch(console.log)
    }

    render() {
    
        const storeCards = this.state.stores ? this.state.stores.map((store)=><StoreCard key={store.store_id} store={store} />) : [];
        
        return (
            <ItemGroup style={{
                maxWidth: 1000, margin: '1.5em auto',
                display:'flex', justifyContent:'space-evenly', flexWrap: 'wrap'
            }}>
                {storeCards}
            </ItemGroup>
        );
    }
}

export default ExplorePage;