import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, registerField, change, formValueSelector } from 'redux-form';
import { Prompt } from 'react-router-dom';
import GridContainer from '../Grid/GridContainer';
import GridItem from '../Grid/GridItem';
import RegularButton from '../CustomButtons/Button';
import TextField from '../CustomInput/TextField';
import SelectField from '../CustomInput/SelectField';
import DatePickerField from '../CustomInput/DatePickerField';
//import { fetchDepartments, fetchProvinces, fetchDistricts } from '../../actions/ubigeo';
import { setCodDep, setCodPro } from '../../actions/ubigeo';
import { Typography, Button } from '@material-ui/core';
import { getDepartments, getProvinces, getDistricts } from '../../selectors/ubigeo';
import { fetchDataWithIdentityDocument } from '../../actions/service';
import { NO_ENCONTRADO, ENCONTRADO, EXISTE, MAX_LENGTH_DNI } from '../../Constants';
//import { loadPerson } from '../../actions/person';
import SweetAlert from 'sweetalert-react';
import { normalizeNumber, Length,  normalizePhone } from '../../utils/utils';
import { setPropsAsInitial } from '../../helpers/setPropsAsInitial';
//import 'sweetalert/dist/sweetalert.css';

const validate = values => {
    const errors = {};
    const requiredFields = [
      'dni',
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

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

class ParentForm extends Component {
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
    //         this.props.changeValue( 'ParentForm', 'codPro', '');
    //         this.props.changeValue( 'ParentForm', 'codDis', '');
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
    //         this.props.changeValue( 'ParentForm', 'codDis', '');
    //         flag = true;
    //     }
    //     if(flag && value && this.props.provinces.length > 0){
    //         this.props.fetchDistricts(this.props.codDep, value);        
    //     }
    // }

    componentDidMount() {
        this.props.registerInput('ParentForm', 'subject','Field');
        //this.props.fetchDepartments();
    }
    
    handleBlur = ({target}) => {
        return sleep(100).then(() => {
            const value = target.defaultValue;
            if(value.length== MAX_LENGTH_DNI){
                this.setState({load: true});
                fetchDataWithIdentityDocument(value, this.props.subjectType).then(response =>{
                    const { data, code } = response;
                    if(code == NO_ENCONTRADO){
                        if(data) {
                            this.props.changeValue( 'ParentForm', 'dni', data.dni);
                            this.props.changeValue( 'ParentForm', 'firstName', data.firstName);
                            this.props.changeValue( 'ParentForm', 'lastName', data.lastName);
                        }
                        this.setState({load: false});
                    }
                    if(code == ENCONTRADO){
                        this.props.changeValue( 'ParentForm', 'dni', data.dni);
                        this.props.changeValue( 'ParentForm', 'firstName', data.firstName);
                        this.props.changeValue( 'ParentForm', 'lastName', data.lastName);
                        this.props.changeValue( 'ParentForm', 'birthday', data.birthday);
                        this.props.changeValue( 'ParentForm', 'phone', data.phone);
                        this.props.changeValue( 'ParentForm', 'codDep', data.codDep);
                        this.props.changeValue( 'ParentForm', 'codPro', data.codPro);
                        this.props.changeValue( 'ParentForm', 'codDis', data.codDis);
                        this.props.changeValue( 'ParentForm', 'city', data.city);
                        this.props.changeValue( 'ParentForm', 'address', data.address);
                        this.props.changeValue( 'ParentForm', 'subject', data.identifier);
                        this.setState({load: false});              
                    }
                    if(code == EXISTE){
                        this.setState({load: false});
                        this.setState({ show: true });
                        this.props.changeValue( 'ParentForm', 'identityNumber','');
                    }
                });
            }
        })
    }
    
    render() {
        const { handleSubmit, departments, provinces, districts, pristine, submitting, codDep, codPro, reset, submitSucceeded, textAlert } = this.props;
        return (
            <form onSubmit={handleSubmit}>
                <Typography variant="h6" color="primary">Datos generales</Typography>
                <GridContainer>
                    <GridItem md={6}>
                        <Field 
                            name="identityNumber"
                            label="DNI"
                            formControlProps={{
                                fullWidth: true
                            }}
                            inputProps={{
                                
                            }}
                            load={this.state.load}
                            onBlur={this.handleBlur}
                            component={TextField}
                            validate={[ Length(8)]}
                            normalize={normalizeNumber(8)}
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
                    <GridItem md={6}>
                        <Field 
                            name="birthday"
                            label="Cumpleaños"
                            formControlProps={{
                                fullWidth: true
                            }}
                            component={DatePickerField}
                        />
                    </GridItem>
                    <GridItem md={6}>
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
                    text={`Ya existe registrado ${textAlert} con este DNI, ingrese otro DNI`}
                    onConfirm={()=> this.setState({show: false})}
                />

            </form>
        );
    }
}

const ParentFormEdit = reduxForm(
    {
      form: 'ParentForm',
      validate,
    }
)(ParentForm);

const selector = formValueSelector('ParentForm');

const mapStateToProps = state => ({
    departments: getDepartments(state),
    provinces: getProvinces(state),
    districts: getDistricts(state),
    codDep: selector(state,'codDep'),
    codPro: selector(state,'codPro'),
});

export default connect(mapStateToProps,{
    // fetchDepartments,
    // fetchProvinces,
    // fetchDistricts,
    setCodDep,
    setCodPro,
    registerInput: registerField,
    changeValue: change,
})(setPropsAsInitial(ParentFormEdit));
