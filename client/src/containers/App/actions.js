/*
 * App Actions
 *
 * Actions change things in your application
 * Since this boilerplate uses a uni-directional data flow, specifically redux,
 * we have these actions which are the only way your application interacts with
 * your application state. This guarantees that your state is up to date and nobody
 * messes it up weirdly somewhere.
 *
 * To add a new Action:
 * 1) Import your constant
 * 2) Add a function like this:
 *    export function yourAction(var) {
 *        return { type: YOUR_ACTION_CONSTANT, var: var }
 *    }
 */

import { LOG_IN, LOG_OUT } from './constants';

/**
 * Login user, update user data after successfully log in
 * 
 * @param  {object} user The user data
 *
 * @return {object} An action object with a type of LOG_IN
 */
export function loginUser(user) {
  return {
    type: LOG_IN,
    user
  };
}

/**
 * Logout user, clear user data after successfully log out
 *
 * @return {object} An action object with a type of LOG_OUT
 */
export function logoutUser() {
  return {
    type: LOG_OUT,
  };
}