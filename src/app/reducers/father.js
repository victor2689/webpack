import { handleActions } from 'redux-actions';
import { FETCH_FATHER, INSERT_FATHER } from '../actions/types';

export const father = handleActions({
    [FETCH_FATHER]: (state, action) => ({...action.payload }),
}, {});