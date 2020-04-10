import {FETCH_REVIEWS_PENDING, FETCH_REVIEWS_SUCCESS, FETCH_REVIEWS_FAIL} from './constants';
import {server_addr} from '../../const';

export const fetchReviews = () => (dispatch) => {
    dispatch({type:FETCH_REVIEWS_PENDING});
    fetch(server_addr+'/fetch-review')
    .then(response => response.json())
    .then(json => dispatch({type:FETCH_REVIEWS_SUCCESS, payload:json.all_review}))
    .catch(error => dispatch({type:FETCH_REVIEWS_FAIL, payload:error}));
}