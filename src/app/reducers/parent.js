import { handleActions } from 'redux-actions';
import { FETCH_PARENT } from '../actions/types';

export const parent = handleActions({
    [FETCH_PARENT]: (state, action) => ({...action.payload}),
}, {});