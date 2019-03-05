import { createAction } from 'redux-actions';
import { FECTH_ENTERPRISE } from './types';
import { apiGet } from '../api';

export const fetchEnterprise = createAction(FECTH_ENTERPRISE, apiGet('/enterprise'));