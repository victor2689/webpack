import axios from 'axios';
import cookie from 'react-cookies';
import { urlBase, urlApiConsult } from './urls';

const token = cookie.load('token');

const settings = token ? 
    {
        baseURL: urlBase,
        headers: {
            Authorization:
            `Bearer ${token}`,
            'Access-Control-Allow-Origin': "*",
        }
    }:
    {
        'baseURL': urlBase,
        'headers': {
            'Access-Control-Allow-Origin': "*",        
        }
    };

export const service = axios.create(settings);

export const serviceApi = axios.create({
    baseURL: urlApiConsult,
    'headers': {
        'Access-Control-Allow-Origin': "*", 
        'Access-Control-Allow-Headers': "Content-Type, Authorization"      
    }
})
