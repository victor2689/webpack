import { FETCH_CLASSROOMS, FETCH_CLASSROOM, INSERT_CLASSROOM, UPDATE_CLASSROOM, DELETE_CLASSROOM } from "../actions/types";
import { handleActions} from 'redux-actions';

export const classroom = handleActions({
  [FETCH_CLASSROOMS]: (state, action) => ({...action.payload}),
  [FETCH_CLASSROOM]: (state, action) => ({ ...state, only: action.payload.data }),
  [INSERT_CLASSROOM]: (state, action) => ({...state, insert: true}),
  [UPDATE_CLASSROOM]: (state, action) => ({...state, update: true}),
  [DELETE_CLASSROOM]: (state, action) => ({...state, delete: true}),
}, {});