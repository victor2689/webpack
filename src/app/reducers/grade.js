import { FETCH_GRADES, FETCH_GRADE, INSERT_GRADE, DELETE_GRADE, UPDATE_GRADE } from "../actions/types";
import { handleActions} from 'redux-actions';

export const grade = handleActions({
  [FETCH_GRADES]: (state, action) => ({...action.payload}),
  [FETCH_GRADE]: (state, action) => ({ ...state, only: action.payload.data }),
  [INSERT_GRADE]: (state, action) => ({...state, insert: true}),
  [UPDATE_GRADE]: (state, action) => ({...state, update: true}),
  [DELETE_GRADE]: (state, action) => ({...state, delete: true}),
}, {});