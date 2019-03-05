import { createAction } from 'redux-actions';
import { FETCH_CONCEPTS, FETCH_CONCEPT } from './types';
import { apiGet, apiPost, apiDelete, apiPut } from '../api';

export const fetchConcepts = createAction(FETCH_CONCEPTS, apiGet('/concepts'));

export const fetchConcept = createAction(FETCH_CONCEPT, (value) => apiGet(`/concepts/${value}`)());

export const insertConcept = values => apiPost('/concepts', values)();

export const updateConcept = (identifier, values) => apiPut(`/concepts`, identifier, values)();

export const deleteConcept = (identifier, values) => apiDelete(`/seats`, identifier)();