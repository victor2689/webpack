import { createAction } from 'redux-actions';
import { FETCH_DEPARTMENTS, FETCH_PROVINCES, FETCH_DISTRICTS, FETCH_UBIGEO, SET_COD_DEP, SET_COD_PRO } from './types';
import { apiGet } from '../api';

export const fetchUbigeo = createAction(FETCH_UBIGEO, apiGet(`/ubigeos`));
export const setCodDep = createAction(SET_COD_DEP, value =>value);
export const setCodPro = createAction(SET_COD_PRO, value =>value);


// export const fetchDepartments = createAction(FETCH_DEPARTMENTS, apiGet(`/departments`));
// export const fetchProvinces = createAction(FETCH_PROVINCES, cod_dep => apiGet(`/departments/${cod_dep}/provinces`)());
// export const fetchDistricts = createAction(FETCH_DISTRICTS, (cod_dep, cod_pro) => apiGet(`/departments/${cod_dep}/provinces/${cod_pro}/districts`)());
