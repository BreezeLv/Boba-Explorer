import React, {memo, useEffect} from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { ItemGroup, Menu } from 'semantic-ui-react';

import { useInjectReducer } from '../../utils/injectReducer';
import { fetchReviews, changeDisplayMode } from './actions';
import reducer, { initialState } from './reducer';
import ReviewItem from '../../components/ReviewItem';

const key = 'review';

function ReviewPage({
    loading,
    error,
    reviews,
    activeItem,
    user,
    fetchReviews,
    changeDisplayMode
}) {
    useInjectReducer({ key, reducer });

    useEffect(() => {
        fetchReviews();
    }, [fetchReviews]);

    const reviewItemFactory = (elem, idx) => (<ReviewItem key={elem.review_content || idx} review={elem} myReview={activeItem === 'my reviews'}/>);
    const reviewItems = reviews.map(reviewItemFactory);
    const filterItems = user ? reviews.filter((elem) => elem.user_id === user).map(reviewItemFactory) : [];

    const displayItems = activeItem === 'my reviews' ? filterItems : reviewItems;

    return (
        <>
            <Menu pointing secondary>
                <Menu.Item
                    name='all'
                    active={activeItem === 'all'}
                    onClick={changeDisplayMode}
                />
                <Menu.Item
                    name='my reviews'
                    active={activeItem === 'my reviews'}
                    disabled={!user}
                    onClick={changeDisplayMode}
                />
            </Menu>
            <ItemGroup divided={true} style={{ maxWidth: 400, margin: '1.5em auto' }}>
                {displayItems}
            </ItemGroup>
        </>
    );
}

const mapStateToProps = (state) => {
    console.log(state)
    return {
        loading : state.review ? state.review.loading : initialState.loading,
        error : state.review ? state.review.error : initialState.error,
        reviews : state.review ? state.review.reviews : initialState.reviews,
        activeItem : state.review ? state.review.activeItem : initialState.activeItem,
        user : state.global.user,
    }
};

export function mapDispatchToProps(dispatch) {
    return {
        fetchReviews: () => dispatch(fetchReviews()),
        changeDisplayMode: (e,{name}) => dispatch(changeDisplayMode(name))
    };
}

const withConnect = connect(
    mapStateToProps,
    mapDispatchToProps,
);

export default compose(
    withConnect,
    memo,
)(ReviewPage);