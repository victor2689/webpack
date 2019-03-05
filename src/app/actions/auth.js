import { createAction } from 'redux-actions';
import { LOGIN_PENDING, LOGIN } from './types';
import { urlBase } from '../api/urls';
import { apiPost } from '../api';
import { USER_LOGIN_OBJECT } from '../api/constant';

export const login = createAction(LOGIN, 
    ({username, password }) => {
        USER_LOGIN_OBJECT.username = username;
        USER_LOGIN_OBJECT.password = password;
        return apiPost(`${urlBase}/oauth/token`, USER_LOGIN_OBJECT)();
    } );