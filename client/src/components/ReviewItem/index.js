import React from 'react';
import { Button, Item, Icon, Dropdown, TextArea } from 'semantic-ui-react';


class ReviewItem extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            commentVisible : false,
            comment : props.review.review_content ? props.review.review_content : '',
        };
    }

    OnEdit = () => {
        this.setState({commentVisible:true});
    }
    
    OnDelete = () => {
        const {deleteReview, review} = this.props;
        deleteReview(review.review_id)
    }
    
    onChangeTextArea = (e) => {
        this.setState({comment:e.target.value});
    }

    onCancelEdit = () => {
        this.setState({commentVisible:false});
    }
    
    onUpdateEdit = () => {
        this.setState({commentVisible:false});

        const {review} = this.props;
        this.props.updateReview(review.review_id,this.state.comment)
    }

    render() {

        const {review} = this.props;
        console.log(review);
    
        const editTextarea = (
                <>
                    <Item.Extra>
                        <TextArea value={this.state.comment} onChange={this.onChangeTextArea}></TextArea>
                    </Item.Extra>
                    <Item.Extra>
                        <Button color='red' onClick={this.onCancelEdit} >Cancel</Button>
                        <Button color='green' onClick={this.onUpdateEdit} >Update</Button>
                    </Item.Extra>
                </>
        );
    
        return (
            <>
                <Item>
                        <Item.Image size='tiny'><Icon name='user'>{review.user_name?review.user_name:"Unknown User"}</Icon></Item.Image>
    
                        <Item.Content verticalAlign='middle'>
                            {!this.state.commentVisible && (
                                <Item.Description>
                                    {review.review_content ? review.review_content : 'Unknown Review'}
                                </Item.Description>
                            )}
                            
                            {this.state.commentVisible && editTextarea}
                        </Item.Content>
    
                        {this.props.myReview && (
                            <Dropdown disabled={this.state.commentVisible} >
                                <Dropdown.Menu>
                                    <Dropdown.Item text='Edit' onClick={this.OnEdit} />
                                    <Dropdown.Item text='Delete' onClick={this.OnDelete} />
                                </Dropdown.Menu>
                            </Dropdown>
                        )}
                    </Item>
            </>
        );
    }
}

export default ReviewItem;