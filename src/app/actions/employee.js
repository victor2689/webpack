import { createAction } from 'redux-actions';
import { FETCH_EMPLOYEES } from './types';
import { apiGet, apiPost } from '../api';
import { formatDate } from '../utils/utils';

export const fetchEmployees = createAction(FETCH_EMPLOYEES, apiGet(`/employees`));
export const insertEmployee =  values => {
  values.birthday = formatDate(values.birthday);
  values.initDate = formatDate(values.initDate);
  values.endDate = formatDate(values.endDate);
  
  return apiPost('/employees', values)();
}
