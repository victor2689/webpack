import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, change, formValueSelector, } from 'redux-form';
import GridContainer from '../Grid/GridContainer';
import GridItem from '../Grid/GridItem';
import RegularButton from '../CustomButtons/Button';
import TextField from '../CustomInput/TextField';
import SelectField from '../CustomInput/SelectField';
//import { fetchDepartments, fetchProvinces, fetchDistricts } from '../../actions/ubigeo';
import { setCodDep, setCodPro } from '../../actions/ubigeo';

import { getDepartments, getProvinces, getDistricts } from '../../selectors/ubigeo';
import CheckBox from '../CustomInput/CheckBox';
import { Button } from '@material-ui/core';
import { normalizePhone } from '../../utils/utils';
import { setPropsAsInitial } from '../../helpers/setPropsAsInitial';

const validate = values => {
    const errors = {};
    const requiredFields = [
      'name',
      'address',
      'phone'
    ];
    requiredFields.forEach(field => {
      if (!values[field]) {
        errors[field] = 'Requerido';
      }
    });

    return errors;
  }

class SeatForm extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
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
    //     console.log("llego")
    //     let flag = false;
    //     if(codDep == '' || codDep !== value){
    //         this.setState({codDep: value});
    //         this.setState({codPro: ''});
    //         if(this.props.initialValues && value !== this.props.initialValues.codDep){
    //             this.props.changeValue( 'SeatForm', 'codPro', '');
    //             this.props.changeValue( 'SeatForm', 'codDis', '');
    //         }
    //         flag = true;
    //     }
    //     if(flag && value){
    //         this.props.fetchProvinces(value);
    //     }
    // }

    // getDistrictWithCodeProv = (value, codPro) =>{
    //     console.log("llego pro")

    //     let flag = false;
    //     if(codPro == '' || codPro !== value){
    //         this.setState({codPro: value});
    //         if(this.props.initialValues && value !== this.props.initialValues.codPro){
    //             this.props.changeValue( 'SeatForm', 'codDis', '');
    //         }
    //         flag = true;
    //     }

    //     if(flag && value ){
    //         this.props.fetchDistricts(this.props.codDep, value);        
    //     }
    // }

    componentDidMount() {
        //this.props.fetchDepartments();
    }

    render() {
        const { handleSubmit, codDep, codPro, departments, provinces, districts, pristine, submitting, onBack, submitSucceeded, reset } = this.props;
        return (
            <form onSubmit={handleSubmit}>
                <GridContainer>
                    <GridItem md={4}>
                        <Field 
                            name="name"
                            label="Nombre"
                            formControlProps={{
                                fullWidth: true
                            }}
                            component={TextField} 
                        />
                    </GridItem>
                    <GridItem md={4}>
                        <Field 
                            name="phone"
                            label="Teléfono"
                            formControlProps={{
                                fullWidth: true
                            }}
                            normalize={normalizePhone}
                            component={TextField} 
                        />
                    </GridItem>
                    <GridItem md={4}>
                        <Field 
                            name="main"
                            label="Principal"
                            component={CheckBox} 
                        />
                    </GridItem>
                </GridContainer>
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
            </form>
        );
    }
}
const SeatFormEdit = reduxForm(
    {
      form: 'SeatForm',
      validate
    }
  )(SeatForm);

const selector = formValueSelector('SeatForm');

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
    changeValue: change,
})(setPropsAsInitial(SeatFormEdit));
