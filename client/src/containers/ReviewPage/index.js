import React, {memo, useEffect} from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { ItemGroup } from 'semantic-ui-react';

import { useInjectReducer } from '../../utils/injectReducer';
import { fetchReviews } from './actions';
import reducer, { initialState } from './reducer';
import ReviewItem from '../../components/ReviewItem';

const key = 'review';

function ReviewPage({
    loading,
    error,
    review,
    show_only_curr_user,
    fetchReviews
}) {
    useInjectReducer({ key, reducer });

    useEffect(() => {
        fetchReviews();
    }, []);

    const reviewItems = !review?[]:review.map((elem, idx)=><ReviewItem key={'review'+toString(idx)} review={elem} />)

    return (
        <>
            <ItemGroup divided={true} style={{ maxWidth: 500, margin: '1.5em auto' }}>
                {reviewItems}
            </ItemGroup>
        </>
    );
}

const mapStateToProps = (state) => {
    return {
        loading : state.review ? state.review.loading : initialState.loading,
        error : state.review ? state.review.error : initialState.error,
        review : state.review ? state.review.review : initialState.review,
        show_only_curr_user : state.review ? state.review.show_only_curr_user : initialState.show_only_curr_user,
    }
};

export function mapDispatchToProps(dispatch) {
    return {
        fetchReviews: () => dispatch(fetchReviews()),
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