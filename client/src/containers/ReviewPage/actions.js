import {FETCH_REVIEWS_PENDING, FETCH_REVIEWS_SUCCESS, FETCH_REVIEWS_FAIL, CHANGE_DISPLAY_MODE, UPDATE_REVIEW_PENDING, UPDATE_REVIEW_SUCCESS, DELETE_REVIEW_SUCCESS} from './constants';
import {server_addr} from '../../const';

export const fetchReviews = () => (dispatch) => {
    dispatch({type:FETCH_REVIEWS_PENDING});
    fetch(server_addr+'/fetch-review')
    .then(response => response.json())
    .then(json => dispatch({type:FETCH_REVIEWS_SUCCESS, payload:json.reviews}))
    .catch(error => dispatch({type:FETCH_REVIEWS_FAIL, payload:error}));
}

export const updateReview = (review_id,review_content) => (dispatch) => {
    dispatch({type:UPDATE_REVIEW_PENDING});
    fetch(server_addr+'/update-review',{
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({
            review_id : review_id,
            review_content : review_content
        })
    })
    .then(response => response.json())
    .then(json => {
        if(json.err_msg) dispatch({type:FETCH_REVIEWS_FAIL, payload:json.err_msg})
        else dispatch({type:UPDATE_REVIEW_SUCCESS, payload:json})
    })
    .catch(error => dispatch({type:FETCH_REVIEWS_FAIL, payload:error}));
}

export const deleteReview = (review_id) => (dispatch) => {
    fetch(server_addr+'/delete-review',{
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({
            review_id : review_id
        })
    })
    .then(response => response.json())
    .then(json => {
        if(json.err_msg) dispatch({type:FETCH_REVIEWS_FAIL, payload:json.err_msg})
        else dispatch({type:DELETE_REVIEW_SUCCESS, payload:json})
    })
    .catch(error => dispatch({type:FETCH_REVIEWS_FAIL, payload:error}));
}

export const changeDisplayMode = (name) => {
    return {
        type : CHANGE_DISPLAY_MODE,
        activeItem : name
    }
}