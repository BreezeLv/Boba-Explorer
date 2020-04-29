/*
 * AppReducer
 *
 * The reducer takes care of our data. Using actions, we can
 * update our application state. To add a new action,
 * add it to the switch statement in the reducer function
 *
 */

import produce from 'immer';
import { LOG_IN, LOG_OUT } from './constants';

// The initial state of the App
export const initialState = {
//   loading: false,
  error: false,
  user: false,
  userData: {
    username: false,
  },
};

const appReducer = (state = initialState, action) =>
    produce(state, draft => {
        switch (action.type) {
        case LOG_IN:
            draft.error = false;
            draft.user = action.user.user_id;
            draft.userData.username = action.user.username;
            break;

        case LOG_OUT:
            draft.error = false;
            draft.user = false;
            draft.userData.username = false;
            break;

        default:
            break;
        }
    });

export default appReducer;