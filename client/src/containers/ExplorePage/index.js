import React from 'react';
import { ItemGroup, CardGroup } from 'semantic-ui-react';

import {server_addr} from '../../const';

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
            console.log(res)
            this.setState({stores:res.stores});
        })
        .catch(console.log)
    }

    render() {
    
        const storeCards = this.state.map((store)=><StoreCard key={store.store_id} store={store} />);
        
        return (
            <>
                <CardGroup style={{ maxWidth: 500, margin: '1.5em auto' }}>
                    {storeCards}
                </CardGroup>
            </>
        );
    }
}

export default ExplorePage;