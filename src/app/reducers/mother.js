import { handleActions } from 'redux-actions';
import { FETCH_MOTHER } from '../actions/types';

export const mother = handleActions({
    [FETCH_MOTHER]: (state, action) => ({...action.payload }),
}, {});