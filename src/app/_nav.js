export default [
  {
    name: 'Educativo',
    path: '/educational',
    icon: 'solution',
    children: [
      {
        name: 'Matricula',
        path:'/educational/enrollment',
        exact: true
      }
    ]
  },
  {
    name: 'Caja',
    path: '/cash',
    icon: 'dollar',
    children: [
      {
        name: 'Ingresos',
        path: '/cash',
        children: [
          {
            name: 'Matricula',
            path: '/cash/charge',
            exact: true,
          },
          {
            name: 'Pensión',
            path: '/cash/monthlypaymnet',
            exact: true
          },
          {
            name: 'Cobros',
            path: '/cash/income',
            exact: true
          }
        ]
      },
      {
        name: 'Salidas',
        path: '/cash',
        children: [
          {
            name: 'Pagos',
            path: '/cash/payout',
            exact: true
          },
          {
            name: 'Sueldos',
            path: '/cash/salaries',
            exact: true
          }
        ]
      }
    ]
  },
  {
    name: 'Recursos Humanos',
    path: '/rrhh',
    icon: 'user',
    children: [
      {
        name: 'Padres',
        path: '/rrhh/fathers',
        exact: true
      },
      {
        name: 'Madres',
        path: '/rrhh/Mothers',
        exact: true
      },
      {
        name: 'Apoderados',
        path: '/rrhh/parents',
        exact: true
      },
      {
        name: 'Alumnos',
        path: '/rrhh/students',
        exact: true
      },
      {
        name: 'Personal',
        path: '/rrhh/employees',
        exact: true
      }
    ]
  },
  {
    name: 'Administración',
    path: '/administration',
    icon: 'global',
    children: [
      {
        name: 'Año academico',
        path: '/administration/academicyears',
        exact: true
      },

      {
        name: 'Niveles',
        path: '/administration/levels',
        exact: true
      },
      {
        name: 'Grados',
        path: '/administration/grades',
        exact: true
      },
      {
        name: 'Aulas',
        path: '/administration/classrooms',
        exact: true
      },
      {
        name: 'Conceptos',
        path: '/administration/concepts',
        exact: true
      },
      {
        name: 'Descuentos',
        path: '/administration/discounts',
        exact: true
      },
    ]
  },
  {
    name: 'Configuración',
    path: '/configuration',
    icon: 'setting',
    children: [
      {
        name: 'Empresa',
        path: '/configuration/company',
        exact: true
      },
      {
        name: 'Sedes',
        path: '/configuration/seats',
        exact: true
      }
    ]
  }
];

  