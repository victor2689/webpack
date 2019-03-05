import { handleActions } from 'redux-actions';
import { FETCH_CONCEPTS } from '../actions/types';

export const concept = handleActions({
    [FETCH_CONCEPTS]: (state, action) => ({...action.payload}),
}, {});