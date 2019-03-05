import { handleActions } from 'redux-actions';
import { FECTH_ENTERPRISE } from '../actions/types';

export const enterprise = handleActions({
    [FECTH_ENTERPRISE]: (state, action) => ({...action.payload.data }),
}, {});