import { createAction } from 'redux-actions';
import { FETCH_SEATS, FETCH_SEAT, INSERT_SEAT, MAIN_SEATS } from './types';
import { apiGet, apiPost, apiPut } from '../api';

export const fetchSeats = createAction(FETCH_SEATS, apiGet('/seats'));

export const fetchSeat = createAction(FETCH_SEAT, (value) => apiGet(`/seats/${value}`)());

export const insertSeat = values => apiPost('/seats', values)();

export const updateSeat = (identifier, values) => apiPut(`/seats`, identifier, values)();

export const setMainSeat = createAction(MAIN_SEATS,(identifier) => apiPut(`/seats/main`, identifier)());

