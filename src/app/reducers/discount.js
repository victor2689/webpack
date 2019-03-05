import { handleActions } from 'redux-actions';
import { FETCH_DISCOUNTS } from '../actions/types';

export const discount = handleActions({
    [FETCH_DISCOUNTS]: (state, action) => ({...action.payload}),
}, {});