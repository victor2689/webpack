import { handleActions } from 'redux-actions';
import { LOGIN_PENDING, LOGIN, LOGIN_REJECTED } from '../actions/types';
import cookie from 'react-cookies';

export const auth = handleActions({
    //[LOGIN_PENDING]: (state) => ({...state,isFetching: true, isAuthenticated: false}),
    [LOGIN]: (state, action) => {
        //console.log(action);
        cookie.save('token', action.payload.access_token);
        return {...state,isFetching: false, isAuthenticated: true};
    },
    //[LOGIN_REJECTED]: (state, action) => ({...state,isFetching: true, isAuthenticated: false, errorMessage: action.payload}),
}, {});