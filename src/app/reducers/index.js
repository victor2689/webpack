import { combineReducers } from 'redux';
import { auth } from './auth';
import { menu } from './menu';
import { global } from './global';
import { seat } from './seat';
import { academicyear } from './academicYear';
import { discount } from './discount';
import { monthlyPayment } from './monthlyPayment';
import { concept } from './product';
import { enterprise } from './enterprise';
import { student } from './student';
import { employee } from './employee';
import { parent } from './parent';
import { father } from './father';
import { mother } from './mother';
import { ubigeo } from './ubigeo';
import { reducer as reduxForm } from 'redux-form';
import { complement } from './complement';
import { level } from './level';
import { grade } from './grade';
import { classroom } from './classroom';

export default combineReducers({
  form: reduxForm,
  auth,
  menu,
  global,
  seat,
  level,
  grade,
  classroom,
  academicyear,
  discount,
  monthlyPayment,
  concept,
  student,
  employee,
  parent,
  father,
  mother,
  ubigeo,
  complement,
  enterprise
});