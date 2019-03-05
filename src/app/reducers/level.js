import { FETCH_LEVELS, INSERT_LEVEL, FETCH_LEVEL, UPDATE_LEVEL, DELETE_LEVEL } from "../actions/types";
import { handleActions} from 'redux-actions';

export const level = handleActions({
  [FETCH_LEVELS]: (state, action) => ({...action.payload}),
  [FETCH_LEVEL]: (state, action) => ({ ...state, only: action.payload.data }),
  [INSERT_LEVEL]: (state, action) => ({...state, insert: true}),
  [UPDATE_LEVEL]: (state, action) => ({...state, update: true}),
  [DELETE_LEVEL]: (state, action) => ({...state, delete: true}),
}, {});