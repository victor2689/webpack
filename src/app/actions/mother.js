import { createAction } from 'redux-actions';
import { FETCH_MOTHER } from './types';
import { apiGet } from '../api';

export const fetchMothers = createAction(FETCH_MOTHER, apiGet(`/mothers`));
//export const insertFather = createAction(INSERT_FATHER, payload=>payload);