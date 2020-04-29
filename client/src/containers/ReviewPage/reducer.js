import produce from 'immer';
import {FETCH_REVIEWS_PENDING, FETCH_REVIEWS_SUCCESS, FETCH_REVIEWS_FAIL, CHANGE_DISPLAY_MODE, UPDATE_REVIEW_PENDING, UPDATE_REVIEW_SUCCESS, DELETE_REVIEW_SUCCESS} from './constants';

// The initial state of the Review
export const initialState = {
    loading : false,
    error : false,
    reviews : [],
    activeItem : 'all'
};

/* eslint-disable default-case, no-param-reassign */
const reviewReducer = (state = initialState, action) =>
    produce(state, draft => {
        switch (action.type) {
            case FETCH_REVIEWS_PENDING:
                draft.loading = true;
                draft.error = false;
                draft.reviews = [];
                break;

            case FETCH_REVIEWS_SUCCESS:
                draft.loading = false;
                draft.error = false;
                draft.reviews = action.payload;
                break;

            case FETCH_REVIEWS_FAIL:
                draft.loading = false;
                draft.error = action.payload;
                break;

            case CHANGE_DISPLAY_MODE:
                draft.activeItem = action.activeItem;
                break;

            case UPDATE_REVIEW_PENDING:
                draft.loading = true;
                draft.error = false;
                break;

            case UPDATE_REVIEW_SUCCESS:
                draft.loading = false;
                draft.error = false;
                const updated = draft.reviews.find((elem)=>elem.review_id===action.payload.review_id);
                if(updated) updated.review_content = action.payload.review_content;
                break;

            case DELETE_REVIEW_SUCCESS:
                draft.loading = false;
                draft.error = false;
                const deletedIdx = draft.reviews.findIndex((elem)=>elem.review_id===action.payload.review_id);
                if(deletedIdx > -1) draft.reviews.splice(deletedIdx,1);
                break;

            default:
                break;
    }
});
  
  export default reviewReducer;