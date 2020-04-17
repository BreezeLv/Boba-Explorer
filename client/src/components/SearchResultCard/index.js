import React from 'react';
import { Button, Item, TextArea, TransitionGroup, Header, Modal } from 'semantic-ui-react';
import { connect } from 'react-redux';

import {server_addr} from '../../const';


const mapStateToProps = (state) => {
    return {
        user : state.global.user,
    }
};

class SearchResultCard extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            commentVisible : false,
            comment : '',
            showModal : true,
        };
    }

    CommentSwitch = () => {
        this.setState((prevState)=>{return {commentVisible:!prevState.commentVisible}});
    }

    onWillComment = () => {
        if(!this.props.user) this.setState({showModal:false});
        else this.CommentSwitch();
    }

    onChangeTextArea = (e) => {
        this.setState({comment:e.target.value});
    }

    onCancelComment = () => {
        this.setState({comment:''});
        this.CommentSwitch();
    }

    onSubmitComment = () => {
        this.CommentSwitch();

        const uid = this.props.user;
        if(!uid) {
            this.setState({showModal:false});
            return;
        }

        fetch(server_addr+'/write-review',{
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({
                user_id : uid,
                product_id : this.props.product.product_id,
                review_content : this.state.comment
            })
        })
        .then(res => res.json())
        .then((res) => {
            console.log(res)
            
        })
        .catch(console.log)
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
                            {!this.state.commentVisible && (
                                <Item.Extra>
                                    <Button color='teal' style={{marginRight:0}} onClick={this.onWillComment} >Write a review</Button>
                                </Item.Extra>
                            )}
                        </TransitionGroup>

                        <TransitionGroup animation='slide down' duration={{hide:300,show:900}}>
                            {this.state.commentVisible && (
                                <div>
                                    <Item.Extra>
                                        <TextArea placeholder='Leave some comments..' onChange={this.onChangeTextArea}></TextArea>
                                    </Item.Extra>
                                    <Item.Extra>
                                        <Button color='red' onClick={this.onCancelComment} >Cancel</Button>
                                        <Button color='green' onClick={this.onSubmitComment} >Submit</Button>
                                    </Item.Extra>
                                </div>
                            )}
                        </TransitionGroup>
                        
                    </Item.Content>
                </Item>
                <Modal basic size='tiny' closeIcon open={!this.state.showModal} onClose={()=>{this.setState({showModal:true})}}>
                    <Header icon='exclamation' content='Important  Note' />
                    <Modal.Content>You need to Login/Register first to write a review</Modal.Content>
                </Modal>
            </>
        );
    }
}

export default connect(mapStateToProps,null)(SearchResultCard);