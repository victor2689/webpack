import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, change, registerField, formValueSelector } from 'redux-form';
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
import { validateIdentityDocument } from '../../actions/service';
import { NO_ENCONTRADO, ENCONTRADO, EXISTE, SUBJECT_TYPE_STUDENT, MAX_LENGTH_DNI } from '../../Constants';
import SweetAlert from 'sweetalert-react';
import Autocomplete from '../CustomInput/Autocomplete';
import { normalizePhone, Length, normalizeNumber } from '../../utils/utils';
import { setPropsAsInitial } from '../../helpers/setPropsAsInitial';
import { loadFathers, loadMothers, loadParents } from '../../actions/complement';
//import 'sweetalert/dist/sweetalert.css';

const sex = [
    {value:1,label:"Masculino"},
    {value:2,label:"Femenino"}
];
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

class StudentForm extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
          load: false,
          show: false,
          codDep: '',
          codPro:''
        };
      }
    getProvincesWithCodeDep = () => {
        if(this.props.codDep) this.props.setCodDep(this.props.codDep);
    }
    getDistrictWithCodeProv = (value) =>{
        if(this.props.codPro) this.props.setCodPro(this.props.codPro);
    }
    //   getProvincesWithCodeDep = (value, codDep) => {
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
    handleBlur = ({target}) => {
        return sleep(100).then(() => {
            const value = target.defaultValue;
            if(value.length== MAX_LENGTH_DNI) {
                this.setState({load: true});
                validateIdentityDocument(value, SUBJECT_TYPE_STUDENT).then(response =>{
                    const { data, code } = response;
                    if(code == NO_ENCONTRADO){
                        this.setState({load: false});
                    }
                    if(code == EXISTE){
                        this.setState({load: false});
                        this.setState({ show: true });
                        this.props.changeValue( 'ParentForm', 'identityNumber','');
                    }
                });
            }
        });
    }

    componentDidMount() {
        //this.props.fetchDepartments();
        this.props.loadFathers();
        this.props.loadMothers();
        this.props.loadParents();
    }
    
    render() {
        const { handleSubmit, departments, codDep, codPro, provinces, districts, mothers, fathers, parents, pristine, submitting, reset, submitSucceeded } = this.props;
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
                            component={TextField}
                            onBlur={this.handleBlur}
                            validate={[ Length(8) ]}
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
                            onChange={this.getProvincesWithCodeDep()}
                            suggestions={departments}
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
                            onChange={this.getDistrictWithCodeProv()}
                            suggestions={provinces}
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
                <Typography variant="h6" color="primary">Datos de Familiares</Typography>
                <GridContainer>
                    <GridItem md={4}>
                        <Field 
                            name="father"
                            label="Padre"
                            formControlProps={{
                                fullWidth: true
                            }}
                            component={Autocomplete}
                            suggestions={fathers}
                        />
                    </GridItem>
                    <GridItem md={4}>
                        <Field 
                            name="mother"
                            label="Madre"
                            formControlProps={{
                                fullWidth: true
                            }}
                            component={Autocomplete}
                            suggestions={mothers}
                        />
                    </GridItem>
                    <GridItem md={4}>
                        <Field 
                            name="parent"
                            label="Apoderado"
                            formControlProps={{
                                fullWidth: true
                            }}
                            component={Autocomplete}
                            suggestions={parents}
                        />
                    </GridItem>
                </GridContainer>
                <Typography variant="h6" color="primary">Procedencia</Typography>
                <GridContainer>
                    <GridItem md={8}>
                        <Field 
                            name="school"
                            label="Colegio"
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
                    text={"Ya existe registrado un estudiante con este DNI, ingrese otro DNI"}
                    onConfirm={()=> this.setState({show: false})}
                />
            </form>
        );
    }
}
const StudentFormEdit = reduxForm(
    {
      form: 'StudentForm',
      validate,
    }
)(StudentForm);

const selector = formValueSelector('StudentForm');

const mapStateToProps = state => ({
    departments: getDepartments(state),
    provinces: getProvinces(state),
    districts: getDistricts(state),
    codDep: selector(state,'codDep'),
    codPro: selector(state,'codPro'),
    fathers: state.complement.fathers,
    mothers: state.complement.mothers,
    parents: state.complement.parents,
});
export default connect(mapStateToProps,{
    // fetchDepartments,
    // fetchProvinces,
    // fetchDistricts,
    loadFathers,
    loadMothers,
    loadParents,
    setCodDep,
    setCodPro,
    registerInput: registerField,
    changeValue: change,
})(setPropsAsInitial(StudentFormEdit));
