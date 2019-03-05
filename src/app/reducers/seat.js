import { handleActions } from 'redux-actions';
import { FETCH_SEATS, FETCH_SEAT, INSERT_SEAT, MAIN_SEATS } from '../actions/types';

export const seat = handleActions({
    [FETCH_SEATS]: (state, action) => ({...action.payload}),
    [FETCH_SEAT]: (state, action) => ({ ...state, only: action.payload.data }),
    [MAIN_SEATS]: (state, action) => ({ ...state, main: true }),
}, {});