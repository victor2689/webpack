import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, change, formValueSelector, registerField } from 'redux-form';
import { Prompt } from 'react-router-dom';
import GridContainer from '../Grid/GridContainer';
import GridItem from '../Grid/GridItem';
import TextField from '../CustomInput/TextField';
import SelectField from '../CustomInput/SelectField';
import DatePickerField from '../CustomInput/DatePickerField';
//import { fetchDepartments, fetchProvinces, fetchDistricts } from '../../actions/ubigeo';
import { setCodDep, setCodPro } from '../../actions/ubigeo';

import { Typography, Button } from '@material-ui/core';
import { getDepartments, getProvinces, getDistricts } from '../../selectors/ubigeo';
import SweetAlert from 'sweetalert-react';
import { normalizePhone, normalizeNumber, Length } from '../../utils/utils';
import { loadSeats } from '../../actions/complement';
import { SUBJECT_TYPE_EMPLOYEE, SUBJECT_TYPE_TEACHER, MAX_LENGTH_DNI, NO_ENCONTRADO, ENCONTRADO, EXISTE } from '../../Constants';
import { fetchDataWithIdentityDocument } from '../../actions/service';

const validate = values => {
    const errors = {};
    const requiredFields = [
        'subjectType',
        'identityNumber',
        'adrress',
        'phone'
    ];
    requiredFields.forEach(field => {
      if (!values[field]) {
        errors[field] = 'Requerido';
      }
    });

    return errors;
  }
const subjectTypes = [
    { value: SUBJECT_TYPE_EMPLOYEE , label: 'Docente' },
    { value: SUBJECT_TYPE_TEACHER , label: 'Administrativo' }
];
const sex = [
    { value: 1 , label: 'Masculino' },
    { value: 2 , label: 'Femenino' }
];

const paymodes = [
    { value: 1 , label: 'Efectivo' },
    { value: 2 , label: 'Deposito' }
];

const paydocuments = [
    { value: 1 , label: 'Boleta' },
    { value: 2 , label: 'Factura' }
];

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

class EmployeeForm extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            show: false,
            load: false,
            codDep: '',
            codPro: '',
        };
    }

    getProvincesWithCodeDep = () => {
        if(this.props.codDep) this.props.setCodDep(this.props.codDep);
    }
    getDistrictWithCodeProv = (value) =>{
        if(this.props.codPro) this.props.setCodPro(this.props.codPro);
    }
    // getProvincesWithCodeDep = (value, codDep) => {
    //     let flag = false;
    //     if(codDep == '' || codDep !== value){
    //         this.setState({codDep: value});
    //         this.setState({codPro: ''});
    //         this.props.changeValue( 'EmployeeForm', 'codPro', '');
    //         this.props.changeValue( 'EmployeeForm', 'codDis', '');
    //         flag = true;
    //     }
        
    //     if(flag && value){
    //         this.props.fetchProvinces(value);
    //     }
    // }

    // getDistrictWithCodeProv = (value, codPro) =>{
    //     let flag = false;
    //     if(codPro == '' || codPro !== value){
    //         this.setState({codPro: value});
    //         this.props.changeValue( 'EmployeeForm', 'codDis', '');
    //         flag = true;
    //     }
    //     //console.log(this.state);
    //     if(flag && value ){
    //         this.props.fetchDistricts(this.props.codDep, value);        
    //     }
    // }

    handleBlur = (identityNumber, subjectType) => {
        console.log('llego');
        if( !!identityNumber && !!subjectType) {
            return sleep(100).then(() => {
            
                if(identityNumber.length == MAX_LENGTH_DNI) {
                    this.setState({load: true});
                    fetchDataWithIdentityDocument(identityNumber, subjectType).then(response =>{
                        const { data, code } = response;
                        if(code == NO_ENCONTRADO) {
                            this.props.changeValue( 'EmployeeForm', 'dni', data.dni);
                            this.props.changeValue( 'EmployeeForm', 'firstName', data.firstName);
                            this.props.changeValue( 'EmployeeForm', 'lastName', data.lastName);
                            this.setState({load: false});
                        }
                        if(code == ENCONTRADO) {
                            this.props.changeValue( 'EmployeeForm', 'dni', data.dni);
                            this.props.changeValue( 'EmployeeForm', 'firstName', data.firstName);
                            this.props.changeValue( 'EmployeeForm', 'lastName', data.lastName);
                            this.props.changeValue( 'EmployeeForm', 'birthday', data.birthday);
                            this.props.changeValue( 'EmployeeForm', 'phone', data.phone);
                            this.props.changeValue( 'EmployeeForm', 'codDep', data.codDep);
                            this.props.changeValue( 'EmployeeForm', 'codPro', data.codPro);
                            this.props.changeValue( 'EmployeeForm', 'codDis', data.codDis);
                            this.props.changeValue( 'EmployeeForm', 'city', data.city);
                            this.props.changeValue( 'EmployeeForm', 'sex', data.sex);
                            this.props.changeValue( 'EmployeeForm', 'address', data.address);
                            this.props.changeValue( 'EmployeeForm', 'subject', data.identifier);
                            this.setState({load: false});               
                        }
                        if(response.code == EXISTE){
                            this.setState({load: false});
                            this.setState({ show: true });
                            this.props.changeValue( 'EmployeeForm', 'identityNumber','');
                        }
                    });
                }
            
            })
        }
    }
    componentDidMount() {
        this.props.registerInput('EmployeeForm', 'subject','Field');
        this.props.loadSeats();
        //this.props.fetchDepartments();
    }

    render() {
        const { handleSubmit, seats, departments, provinces, identityNumber, subjectType, 
            districts,codDep, codPro,  reset, pristine, 
            submitting, submitSucceeded} = this.props;
        return (
            <form onSubmit={handleSubmit}>
                <Typography variant="h6" color="primary">Datos generales</Typography>
                <GridContainer>
                    <GridItem md={4}>
                        <Field 
                            name="subjectType"
                            label="Rol"
                            formControlProps={{
                                fullWidth: true
                            }}
                            component={SelectField}
                            suggestions={subjectTypes}
                            onChange={()=>this.handleBlur(identityNumber, subjectType)}
                        />
                    </GridItem>
                    <GridItem md={4}>
                        <Field 
                            name="identityNumber"
                            label="DNI"
                            formControlProps={{
                                fullWidth: true
                            }}
                            inputProps={{
                                
                            }}
                            load={this.state.load}
                            onBlur={()=>this.handleBlur(identityNumber, subjectType)}
                            //onBlur={this.handleBlur}
                            component={TextField}
                            validate={[ Length(8)]}
                            normalize={normalizeNumber(8)}
                        />
                    </GridItem>
                    <GridItem md={4}>
                        <Field 
                            name="seat"
                            label="Sede"
                            formControlProps={{
                                fullWidth: true
                            }}
                            component={SelectField}
                            suggestions={seats}
                        />
                    </GridItem>
                </GridContainer>
                <GridContainer>
                    <GridItem md={6}>
                        <Field 
                            name="firstName"
                            label="Nombres"
                            formControlProps={{
                                fullWidth: true
                            }}
                            component={TextField} 
                        />
                    </GridItem>
                    <GridItem md={6}>
                        <Field 
                            name="lastName"
                            label="Apellidos"
                            formControlProps={{
                                fullWidth: true
                            }}
                            component={TextField} 
                        />
                    </GridItem>
                </GridContainer>
                <GridContainer>
                    <GridItem md={4}>
                        <Field 
                            name="birthday"
                            label="Cumpleaños"
                            formControlProps={{
                                fullWidth: true
                            }}
                            component={DatePickerField}
                        />
                    </GridItem>
                    <GridItem md={4}>
                        <Field 
                            name="phone"
                            label="Teléfono/Celular"
                            formControlProps={{
                                fullWidth: true
                            }}
                            component={TextField}
                            normalize={normalizePhone}
                        />
                    </GridItem>
                    <GridItem md={4}>
                        <Field 
                            name="sex"
                            label="Sexo"
                            formControlProps={{
                                fullWidth: true
                            }}
                            component={SelectField}
                            suggestions={sex}
                        />
                    </GridItem>
                </GridContainer>
                <Typography variant="h6" color="secondary">Domicilio</Typography>
                <GridContainer>
                    <GridItem md={4}>
                        <Field 
                            name="codDep"
                            label="Departamento"
                            formControlProps={{
                                fullWidth: true
                            }}
                            component={SelectField}
                            suggestions={departments}
                            onChange={this.getProvincesWithCodeDep()}                            
                        />
                    </GridItem>
                    <GridItem md={4}>
                        <Field 
                            name="codPro"
                            label="Provincia"
                            formControlProps={{
                                fullWidth: true
                            }}
                            component={SelectField}
                            suggestions={provinces}
                            onChange={this.getDistrictWithCodeProv()}
                        />
                    </GridItem>
                    <GridItem md={4}>
                        <Field 
                            name="codDis"
                            label="Distrito"
                            formControlProps={{
                                fullWidth: true
                            }}
                            component={SelectField}
                            suggestions={districts}
                        />
                    </GridItem>
                </GridContainer>
                <GridContainer>
                    <GridItem md={4}>
                        <Field 
                            name="city"
                            label="Ciudad"
                            formControlProps={{
                                fullWidth: true
                            }}
                            component={TextField}
                        />
                    </GridItem>
                    <GridItem md={8}>
                        <Field 
                            name="address"
                            label="Dirección"
                            formControlProps={{
                                fullWidth: true
                            }}
                            component={TextField}
                        />
                    </GridItem>
                </GridContainer>
                <Typography variant="h6" color="secondary">Contrato</Typography>
                <GridContainer>
                    <GridItem md={4}>
                        <Field 
                            name="initDate"
                            label="Fecha inicial"
                            formControlProps={{
                                fullWidth: true
                            }}
                            component={DatePickerField}
                        />
                    </GridItem>
                    <GridItem md={4}>
                        <Field 
                            name="endDate"
                            label="Fecha final"
                            formControlProps={{
                                fullWidth: true
                            }}
                            component={DatePickerField}
                        />
                    </GridItem>
                    <GridItem md={4}>
                        <Field 
                            name="payMode"
                            label="Modalidad de pago"
                            formControlProps={{
                                fullWidth: true
                            }}
                            component={SelectField}
                            suggestions={paymodes}
                        />
                    </GridItem>
                </GridContainer>
                <GridContainer>
                    <GridItem md={4}>
                        <Field 
                            name="payDocument"
                            label="Documento de pago"
                            formControlProps={{
                                fullWidth: true
                            }}
                            component={SelectField}
                            suggestions={paydocuments}
                        />
                    </GridItem>
                    <GridItem md={4}>
                        <Field 
                            name="contractNumber"
                            label="Número de contrato"
                            formControlProps={{
                                fullWidth: true
                            }}
                            component={TextField}
                        />
                    </GridItem>
                    <GridItem md={4}>
                        <Field 
                            name="salary"
                            label="Sueldo"
                            formControlProps={{
                                fullWidth: true
                            }}
                            component={TextField}
                        />
                    </GridItem>
                </GridContainer>
                <GridContainer>
                    <GridItem md={6}>
                        <Button disabled={pristine || submitting } variant="contained" color="primary" onClick={handleSubmit}>Guardar</Button>
                        <Button disabled={pristine || submitting } variant="contained" color="secondary" onClick={reset}>Cancelar</Button>
                    </GridItem>
                </GridContainer>
                <Prompt
                    when={!pristine && !submitSucceeded}
                    message="Se perderán los datos si continúa"></Prompt>
                <SweetAlert 
                    show={this.state.show}
                    title="Información"
                    html
                    text={"Ya existe registrado un empleado con este DNI y rol, intente con otros"}
                    onConfirm={()=> this.setState({show: false})}
                />
            </form>
        );
    }
}
const EmployeeFormEdit = reduxForm(
    {
      form: 'EmployeeForm',
      validate
    }
  )(EmployeeForm);

const selector = formValueSelector('EmployeeForm');

const mapStateToProps = state => ({
    departments: getDepartments(state),
    provinces: getProvinces(state),
    districts: getDistricts(state),
    seats: state.complement.seats,
    codDep: selector(state,'codDep'),
    codPro: selector(state,'codPro'),
    identityNumber: selector(state, 'identityNumber'),
    subjectType: selector(state, 'subjectType'),
});
export default connect(mapStateToProps,{
    // fetchDepartments,
    // fetchProvinces,
    // fetchDistricts,
    setCodDep,
    setCodPro,
    loadSeats,
    changeValue: change,
    registerInput: registerField,
})(EmployeeFormEdit);
