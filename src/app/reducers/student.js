import { handleActions } from 'redux-actions';
import { FETCH_STUDENTS } from '../actions/types';

export const student = handleActions({
    [FETCH_STUDENTS]: (state, action) => ({...action.payload}),
}, {});