import cookie from 'react-cookies';

export const initialState = {
    auth: {
        isFetching: false,
        isAuthenticated: cookie.load('token') ? true : false
    },
    menu: {
        menuData : [],
        breadcrumbNameMap: []
    },
    global: {
        collapsed: true,
    },
    seat: { data:[] },
    concept: { data:[] },
    level: { data:[] },
    grade: { data:[] },
    classroom: { data:[] },
    academicyear : { data: []},
    parent: {},
    ubigeo:{
        // departments: [],
        // provinces: [],
        // districts: [],
        data:[],
        codDep: null,
        codPro: null
    },
    complement:{
        fathers: [],
        mothers: [],
        parents: [],
        seats: [],
        grades: [],
        levels: [],
        classrooms: []
    }

}