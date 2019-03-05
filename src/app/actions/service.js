import { urlApiConsult } from "../api/urls";
import { service } from "../api/apis";
import { NO_ENCONTRADO } from "../Constants";
import { apiPost, apiPut } from "../api";
import { insertFather } from "./father";
import { formatDate, transformDataRuc, transformDataDni } from "../utils/utils";


export const fetchDataWithIdentityDocument = async (identityNumber, type ) => {

    const response = await service.get(`/subject/${identityNumber}?type=${type}`).then(response => response.data);
    
    if(response.code == NO_ENCONTRADO){
        response.data = transformDataDni(await fetch(`${urlApiConsult}/dni/${identityNumber}`)
        .then(data => data.json())
        .then(v => v));
        return response;    
    }

    return response;
}
export const fetchDataWithRuc = async (identityNumber, type ) => {

    const response = await service.get(`/subject/${identityNumber}?type=${type}`).then(response => response.data);
    
    if(response.code == NO_ENCONTRADO){
        response.data = transformDataRuc(await fetch(`${urlApiConsult}/ruc/${identityNumber}`)
        .then(data => data.json())
        .then(v => v));
        return response;    
    }

    return response;
}

export const validateIdentityDocument = async (identityNumber, type ) => {

    return await service.get(`/subject/${identityNumber}?type=${type}`).then(response => response.data);  
}

export const insertBusinessSubject = values => {
    if(values.birthday){
        values.birthday = formatDate(values.birthday);
    }
    return apiPost('/businesssubjects', values)();
}

export const insertEnterprise = values => {
    if(values.birthday){
        values.birthday = formatDate(values.birthday);
    }
    return apiPost('/enterprise', values)();
}

export const updateEnterprise = values => {
    console.log(values);
    if(values.birthday){
        values.birthday = formatDate(values.birthday);
    }
    return apiPut(`/enterprise`,values.identifier, values)();
}