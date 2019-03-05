import { createAction } from 'redux-actions';
import { LOAD_FATHERS, LOAD_MOTHERS, LOAD_PARENTS, LOAD_SEATS, LOAD_LEVELS, LOAD_GRADES, LOAD_CLASSROOMS } from './types';
import { apiGet } from '../api';

export const loadFathers = createAction(LOAD_FATHERS, apiGet('util/fathers'));
export const loadMothers = createAction(LOAD_MOTHERS, apiGet('util/mothers'));
export const loadParents = createAction(LOAD_PARENTS, apiGet('util/parents'));
export const loadSeats = createAction(LOAD_SEATS, apiGet('util/seats'));
export const loadLevels = createAction(LOAD_LEVELS, apiGet('util/levels'));
export const loadGrades = createAction(LOAD_GRADES, apiGet('util/grades'));
export const loadClassrooms = createAction(LOAD_CLASSROOMS, apiGet('util/classrooms'));

