import React from 'react';
import { Button, Item, TextArea, TransitionGroup } from 'semantic-ui-react';

class SearchResultCard extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            commentVisible : false,
        };
    }

    CommentSwitch = () => {
        this.setState((prevState)=>{return {commentVisible:!prevState.commentVisible}});
    }

    render() {
        const {product} = this.props;

        return (
            <>
                <Item>
                    <Item.Image size='small' src='/logo192.png' />

                    <Item.Content verticalAlign='middle'>
                        <Item.Header>{product.product_name ? product.product_name : 'Unknown Product'}</Item.Header>
                        <Item.Meta>{product.size ? product.size : 'Regular'}</Item.Meta>
                        <Item.Description>
                            ${product.price ? product.price : 'Unknown Price'}
                        </Item.Description>
                        <Item.Extra as='a'>From teamoji</Item.Extra>
                        
                        <TransitionGroup animation='swing down' duration={{hide:400,show:900}}>
                        {!this.state.commentVisible && (<Item.Extra><Button color='teal' style={{marginRight:0}} onClick={this.CommentSwitch} >Write a review</Button></Item.Extra>)}
                        </TransitionGroup>

                        <TransitionGroup animation='slide down' duration={{hide:300,show:900}}>
                            {this.state.commentVisible && (
                                <div>
                                    <Item.Extra>
                                        <TextArea placeholder='Leave something..'></TextArea>
                                    </Item.Extra>
                                    <Item.Extra>
                                        <Button color='red' onClick={this.CommentSwitch} >Cancel</Button>
                                        <Button color='green' onClick={this.CommentSwitch} >Submit</Button>
                                    </Item.Extra>
                                </div>
                            )}
                        </TransitionGroup>
                        
                    </Item.Content>
                </Item>
            </>
        );
    }
}

export default SearchResultCard;