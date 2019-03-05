import { createAction } from 'redux-actions';
import { FETCH_DISCOUNTS } from './types';

export const fetchDiscounts = createAction(FETCH_DISCOUNTS, params => params);