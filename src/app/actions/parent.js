import { createAction } from 'redux-actions';
import { FETCH_PARENT } from './types';
import { apiGet } from '../api';

export const fetchParents = createAction(FETCH_PARENT, apiGet(`/parents`));
