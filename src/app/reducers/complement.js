import { handleActions } from 'redux-actions';
import { LOAD_MOTHERS, LOAD_FATHERS, LOAD_PARENTS, LOAD_SEATS, LOAD_GRADES, LOAD_LEVELS, LOAD_CLASSROOMS } from '../actions/types';

export const complement = handleActions({
    [LOAD_MOTHERS]: (state, action) => ({...state, mothers: action.payload }),
    [LOAD_FATHERS]: (state, action) => ({...state, fathers: action.payload }),
    [LOAD_PARENTS]: (state, action) => ({...state, parents: action.payload }),
    [LOAD_SEATS]: (state, action) => ({...state, seats: action.payload }),
    [LOAD_LEVELS]: (state, action) => ({...state, levels: action.payload }),
    [LOAD_GRADES]: (state, action) => ({...state, grades: action.payload }),
    [LOAD_CLASSROOMS]: (state, action) => ({...state, classrooms: action.payload }),

}, {});