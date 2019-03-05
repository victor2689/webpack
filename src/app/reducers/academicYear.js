import { handleActions } from 'redux-actions';
import { 
    FETCH_ACADEMICYEARS, 
    FETCH_ACADEMICYEAR, 
    INSERT_ACADEMICYEAR,
    UPDATE_ACADEMICYEAR,
    DELETE_ACADEMICYEAR
} from '../actions/types';

export const academicyear = handleActions({
    [FETCH_ACADEMICYEARS]: (state, action) => ({...action.payload}),
    [FETCH_ACADEMICYEAR]: (state, action) => ({ ...state, only: action.payload.data }),
    [INSERT_ACADEMICYEAR]: (state, action) => ({...state, insert: true}),
    [UPDATE_ACADEMICYEAR]: (state, action) => ({...state, update: true}),
    [DELETE_ACADEMICYEAR]: (state, action) => ({...state, delete: true}),
}, {});