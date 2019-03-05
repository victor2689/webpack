import { handleActions } from 'redux-actions';
import { FETCH_EMPLOYEES } from '../actions/types';

export const employee = handleActions({
    [FETCH_EMPLOYEES]: (state, action) => ({...action.payload}),
}, {});