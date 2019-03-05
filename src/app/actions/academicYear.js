import { createAction } from 'redux-actions';
import { 
  FETCH_ACADEMICYEARS, 
  FETCH_ACADEMICYEAR, 
  INSERT_ACADEMICYEAR,
  UPDATE_ACADEMICYEAR,
  DELETE_ACADEMICYEAR
} from './types';

import { apiPost, apiGet, apiPut, apiDelete } from '../api';

export const fetchAcademicYears = createAction(FETCH_ACADEMICYEARS, apiGet('/academicyears'));

export const fetchAcademicYear = createAction(FETCH_ACADEMICYEAR, (value) => apiGet(`academicyears/${value}`)());

export const insertAcademicYear = createAction(INSERT_ACADEMICYEAR , (values) => apiPost('/academicyears', values)());

export const updateAcademicYear = createAction(UPDATE_ACADEMICYEAR, (identifier, values) => apiPut(`/academicyears`, identifier, values)());

export const deleteAcademicYear = createAction(DELETE_ACADEMICYEAR, (identifier) => apiDelete(`/academicyears`, identifier)());