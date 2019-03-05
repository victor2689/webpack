/* eslint no-useless-escape:0 */
const reg = /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/;

export function isUrl(path) {
  return reg.test(path);
}

export function formatDate(d) {
  d =  new Date(d);
  return d.getFullYear().toString()+"-"+((d.getMonth()+1).toString().length==2?(d.getMonth()+1).toString():"0"+(d.getMonth()+1).toString())+"-"+(d.getDate().toString().length==2?d.getDate().toString():"0"+d.getDate().toString())+" "+(d.getHours().toString().length==2?d.getHours().toString():"0"+d.getHours().toString())+":"+((parseInt(d.getMinutes()/5)*5).toString().length==2?(parseInt(d.getMinutes()/5)*5).toString():"0"+(parseInt(d.getMinutes()/5)*5).toString())+":00";
}

export const normalizeNumber = (max = null) => value => {
  if (!value) {
    return value
  }
  const onlyNums = value.replace(/[^\d]/g, '')
  if(max === null){
    return onlyNums;
  }
  if(max && onlyNums.length <= max){
    return onlyNums;
  }
}
export const maxLength = max => value => {
  return value && value.length > max ? `Debe tener ${max} caracteres o menos` : undefined
}

export const minLength = min => value => {
  return value && value.length < min ? `Debe tener ${min} caracteres o más` : undefined
}


export const Length = length => value => {
  return value && value.length < length ? `Debe tener ${length} caracteres` : undefined
}

export const normalizePhone = (value) => {
  if (!value) {
    return value
  }
  const onlyNums = value.replace(/[^\d]/g, '')
  if (onlyNums.length <= 3) {
    return onlyNums
  }
  if (onlyNums.length <= 6) {
    return `${onlyNums.slice(0, 3)}-${onlyNums.slice(3)}`;
  }
  return `${onlyNums.slice(0, 3)}-${onlyNums.slice(3,6)}-${onlyNums.slice(6,9)}`;
}

export const transformDataDni = value => {
  if(!value){
    return value;
  }
  return {
    dni: value.dni,
    firstName: value.nombres,
    lastName: value.apellido_paterno + ' ' +value.apellido_materno,
  };
}

export const transformDataRuc = value => {
  if(!value){
    return value;
  }
  return {
    ruc: value.ruc,
    businessName: value.razon_social,
    tradeName: value.nombre_comercial,
    address: value.domicilio_fiscal,
  };
}
export const normalizeCheckboxValues = (value, previousValue) => {
  // only the onChange event returns a string
  if (typeof value !== 'string') return previousValue
  if (!previousValue || !previousValue.length) return [value]
  if (!previousValue.find(val => val === value))
    return [...previousValue, value]
  return previousValue.filter(val => val !== value)
}

export const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

export const toUpper = value => value && value.toUpperCase();
export const toLower = value => value && value.toLowerCase();