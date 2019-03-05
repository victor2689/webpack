import Loadable from 'react-loadable';
import loading from './components/PageLoading';

export default [{
        path: "/user",
        component: Loadable({
            loader: () =>
                import ('./layouts/UserLayout'),
            loading
        }),
        routes: [{
                path: "/user",
                redirect: "/user/login",
                exact: true
            },
            {
                path: "/user/login",
                exact: true,
                component: Loadable({
                    loader: () =>
                        import ('./pages/User/Login'),
                    loading
                }),
            }
        ]
    },
    {
        path: '/',
        component: Loadable({
            loader: () =>
                import ('./layouts/BasicLayout'),
            loading
        }),
        routes: [{
                path: '/',
                redirect: '/educational/enrollment',
                exact: true
            },
            {
                path: '/educational',
                name: 'Educativo',
                icon: 'solution',
                routes: [{
                    path: "/educational/enrollment",
                    name: 'Matricula',
                    exact: true,
                    component: Loadable({
                        loader: () =>
                            import ('./pages/Educational/Enrollment'),
                        loading
                    }),
                }, ]
            },
            {
                path: '/cash',
                name: 'Caja',
                icon: 'dollar',
                routes: [{
                        path: "/cash/charge",
                        name: 'Cobros',
                        exact: true,
                        component: Loadable({
                            loader: () =>
                                import ('./pages/Cash/Charge'),
                            loading
                        }),
                    },
                    {
                        path: "/cash/monthlypayment",
                        name: 'Pensión',
                        exact: true,
                        component: Loadable({
                            loader: () =>
                                import ('./pages/Cash/MonthlyPayment'),
                            loading
                        }),
                    },
                    {
                        path: "/cash/income",
                        name: 'Ingresos',
                        exact: true,
                        component: Loadable({
                            loader: () =>
                                import ('./pages/Cash/Income'),
                            loading
                        }),
                    },
                    {
                        path: "/cash/payout",
                        name: 'Pago',
                        exact: true,
                        component: Loadable({
                            loader: () =>
                                import ('./pages/Cash/Payout'),
                            loading
                        }),
                    },
                    {
                        path: "/cash/salaries",
                        name: 'Sueldos',
                        exact: true,
                        component: Loadable({
                            loader: () =>
                                import ('./pages/Cash/Salaries'),
                            loading
                        }),
                    }
                ]
            },
            {
                path: '/rrhh',
                name: 'Recursos Humanos',
                icon: 'user',
                routes: [{
                        path: "/rrhh/fathers",
                        name: 'Padres',
                        exact: true,
                        component: Loadable({
                            loader: () =>
                                import ('./pages/RRHH/Fathers'),
                            loading
                        }),
                    },
                    {
                        path: "/rrhh/fathers/new",
                        name: 'Padres',
                        component: Loadable({
                            loader: () =>
                                import ('./pages/RRHH/Fathers/NewFather'),
                            loading
                        }),
                    },
                    {
                        path: "/rrhh/mothers",
                        name: 'Madres',
                        exact: true,
                        component: Loadable({
                            loader: () =>
                                import ('./pages/RRHH/Mothers'),
                            loading
                        }),
                    },
                    {
                        path: "/rrhh/mothers/new",
                        name: 'Madres',
                        component: Loadable({
                            loader: () =>
                                import ('./pages/RRHH/Mothers/NewMother'),
                            loading
                        }),
                    },
                    {
                        path: "/rrhh/parents",
                        name: 'Apoderados',
                        exact: true,
                        component: Loadable({
                            loader: () =>
                                import ('./pages/RRHH/Parents'),
                            loading
                        }),
                    },
                    {
                        path: "/rrhh/parents/new",
                        name: 'Apoderados',
                        component: Loadable({
                            loader: () =>
                                import ('./pages/RRHH/Parents/NewParent'),
                            loading
                        }),
                    },
                    {
                        path: "/rrhh/students",
                        name: 'Alumnos',
                        exact: true,
                        component: Loadable({
                            loader: () =>
                                import ('./pages/RRHH/Students'),
                            loading
                        }),
                    },
                    {
                        path: "/rrhh/students/new",
                        name: 'Alumnos',
                        component: Loadable({
                            loader: () =>
                                import ('./pages/RRHH/Students/NewStudent'),
                            loading
                        }),
                    },
                    {
                        path: "/rrhh/employees",
                        name: 'Personal',
                        exact: true,
                        component: Loadable({
                            loader: () =>
                                import ('./pages/RRHH/Employees'),
                            loading
                        }),
                    },
                    {
                        path: "/rrhh/employees/new",
                        name: 'Personal',
                        component: Loadable({
                            loader: () =>
                                import ('./pages/RRHH/Employees/NewEmployee'),
                            loading
                        }),
                    },
                ]
            },
            {
                path: '/administration',
                name: 'Administración',
                icon: 'global',
                routes: [
                    {
                        path: "/administration/academicyears",
                        name: 'Año escolar',
                        exact: true,
                        component: Loadable({
                            loader: () =>
                                import ('./pages/Administration/AcademicYear'),
                            loading
                        }),
                    },
                    {
                        path: "/administration/academicyears/new",
                        name: 'Registrar Año',
                        exact: true,
                        component: Loadable({
                            loader: () =>
                                import ('./pages/Administration/AcademicYear/New'),
                            loading
                        }),
                    },
                    {
                        path: "/administration/academicyears/:identifier/edit",
                        name: 'Actualizar Año',
                        exact: true,
                        component: Loadable({
                            loader: () =>
                                import ('./pages/Administration/AcademicYear/Edit'),
                            loading
                        }),
                    },
                    {
                        path: "/administration/classrooms",
                        name: 'Aulas',
                        exact: true,
                        component: Loadable({
                            loader: () =>
                                import ('./pages/Administration/Classrooms'),
                            loading
                        }),
                    },
                    {
                        path: "/administration/classrooms/new",
                        name: 'Registrar Aula',
                        exact: true,
                        component: Loadable({
                            loader: () =>
                                import ('./pages/Administration/Classrooms/New'),
                            loading
                        }),
                    },
                    {
                        path: "/administration/classrooms/:identifier/edit",
                        name: 'Actualizar Aula',
                        exact: true,
                        component: Loadable({
                            loader: () =>
                                import ('./pages/Administration/Classrooms/Edit'),
                            loading
                        }),
                    },

                    {
                        path: "/administration/levels",
                        name: 'Niveles',
                        exact: true,
                        component: Loadable({
                            loader: () =>
                                import ('./pages/Administration/Levels'),
                            loading
                        }),
                    },
                    {
                        path: "/administration/levels/new",
                        name: 'Registrar nivel',
                        exact: true,
                        component: Loadable({
                            loader: () =>
                                import ('./pages/Administration/Levels/New'),
                            loading
                        }),
                    },
                    {
                        path: "/administration/levels/:identifier/edit",
                        name: 'Editar nivel',
                        exact: true,
                        component: Loadable({
                            loader: () =>
                                import ('./pages/Administration/Levels/Edit'),
                            loading
                        }),
                    },
                    {
                        path: "/administration/grades",
                        name: 'Grados',
                        exact: true,
                        component: Loadable({
                            loader: () =>
                                import ('./pages/Administration/Grades'),
                            loading
                        }),
                    },
                    {
                        path: "/administration/grades/new",
                        name: 'Registrar grado',
                        exact: true,
                        component: Loadable({
                            loader: () =>
                                import ('./pages/Administration/Grades/New'),
                            loading
                        }),
                    },
                    {
                        path: "/administration/grades/:identifier/edit",
                        name: 'Editar grado',
                        exact: true,
                        component: Loadable({
                            loader: () =>
                                import ('./pages/Administration/Grades/Edit'),
                            loading
                        }),
                    },

                    {
                        path: "/administration/concepts",
                        name: 'Productos',
                        exact: true,
                        component: Loadable({
                            loader: () =>
                                import ('./pages/Administration/Concepts'),
                            loading
                        }),
                    },
                    {
                        path: "/administration/concepts/new",
                        name: 'Registro Concepto',
                        component: Loadable({
                            loader: () =>
                                import ('./pages/Administration/Concepts/New'),
                            loading
                        }),
                    },
                    {
                        path: "/administration/concepts/:identifier/edit",
                        name: 'Actualizar Concepto',
                        component: Loadable({
                            loader: () =>
                                import ('./pages/Administration/Concepts/Edit'),
                            loading
                        }),
                    },
                    {
                        path: "/administration/discounts",
                        name: 'Descuentos',
                        exact: true,
                        component: Loadable({
                            loader: () =>
                                import ('./pages/Administration/Discounts'),
                            loading
                        }),
                    },
                    // {
                    //   path: "/administration/users",
                    //   name: 'Usuarios',
                    //   exact: true,
                    //   component: Loadable({ loader: () => import('./pages/Administration/Users'), loading }),
                    // },
                    // {
                    //   path: "/administration/rolesandpermissions",
                    //   name: 'Roles y permisos',
                    //   exact: true,
                    //   component: Loadable({ loader: () => import('./pages/Administration/RolesPermissions'), loading }),
                    // }
                ]
            },
            {
                path: '/configuration',
                name: 'Configuración',
                icon: 'setting',
                routes: [{
                        path: "/configuration/company",
                        name: 'Empresa',
                        exact: true,
                        component: Loadable({
                            loader: () =>
                                import ('./pages/Configuration/Company'),
                            loading
                        }),
                    },
                    {
                        path: "/configuration/seats",
                        name: 'Sedes',
                        exact: true,
                        component: Loadable({
                            loader: () =>
                                import ('./pages/Configuration/Seats'),
                            loading
                        }),
                    },
                    {
                        path: "/configuration/seats/new",
                        name: 'Registro Sede',
                        component: Loadable({
                            loader: () =>
                                import ('./pages/Configuration/Seats/SeatNew'),
                            loading
                        }),
                    },
                    {
                        path: "/configuration/seats/:identifier/edit",
                        name: 'Actualizando Sede',
                        component: Loadable({
                            loader: () =>
                                import ('./pages/Configuration/Seats/SeatEdit'),
                            loading
                        }),
                    },
                ]
            },
        ]
    }

];