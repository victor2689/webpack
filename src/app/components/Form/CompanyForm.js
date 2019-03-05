import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Field, reduxForm, change, initialize, formValueSelector, registerField } from 'redux-form';
import { Prompt } from 'react-router-dom';
import GridContainer from '../Grid/GridContainer';
import GridItem from '../Grid/GridItem';
import RegularButton from '../CustomButtons/Button';
import TextField from '../CustomInput/TextField';
import SelectField from '../CustomInput/SelectField';
//import { fetchDepartments, fetchProvinces, fetchDistricts } from '../../actions/ubigeo';
import { setCodDep, setCodPro } from '../../actions/ubigeo';

import { Typography, Button } from '@material-ui/core';
import { getDepartments, getProvinces, getDistricts } from '../../selectors/ubigeo';
import { fetchDataWithRuc } from '../../actions/service';
import { NO_ENCONTRADO, ENCONTRADO, EXISTE, SUBJECT_TYPE_ENTERPRISE, MAX_LENGTH_RUC } from '../../Constants';
import SweetAlert from 'sweetalert-react';
import { normalizeNumber, normalizePhone} from '../../utils/utils';
import { setPropsAsInitial } from '../../helpers/setPropsAsInitial';

const validate = values => {
  const errors = {};
  const requiredFields = [
    'ruc',
    'email',
    'phone'
  ];
  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = 'Requerido';
    }
  });
  if (
    values.email &&
    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
  ) {
    errors.email = 'Correo electronico no valido';
  }
  return errors;
}

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

class CompanyForm extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
          show: false,
          load: false,
          codDep: '',
          codPro: ''
        };
      }
    getProvincesWithCodeDep = () => {
      if(this.props.codDep) this.props.setCodDep(this.props.codDep);
    }
    getDistrictWithCodeProv = (value) =>{
      if(this.props.codPro) this.props.setCodPro(this.props.codPro);
    }

    componentDidMount() {
        this.props.registerInput('CompanyForm', 'subject','Field');
        //this.props.fetchDepartments();
    }
    
    handleBlur = ({target}) => {
      console.log("llego");
        return sleep(100).then(() => {
            const value = target.defaultValue;
            if(value.length == MAX_LENGTH_RUC){
                this.setState({load: true});
            fetchDataWithRuc(value, SUBJECT_TYPE_ENTERPRISE).then(response =>{
              const { data, code } = response;
                if(code == NO_ENCONTRADO){
                  this.props.changeValue( 'CompanyForm', 'ruc', data.ruc);
                  this.props.changeValue( 'CompanyForm', 'businessName', data.businessName);
                  this.props.changeValue( 'CompanyForm', 'tradeName', data.tradeName);
                  this.props.changeValue( 'CompanyForm', 'address', data.address);
                  this.setState({load: false});
                }
                if(code == ENCONTRADO){                
                  this.setState({load: false});              
                }
                if(code == EXISTE){
                    this.setState({load: false});
                    this.setState({ show: true });
                    this.props.changeValue( 'CompanyForm', 'ruc','');
                }
            });
            }
        })
    }
    
    render() {
        const { handleSubmit, departments, provinces, districts, codDep, codPro, pristine, reset, submitting, submitSucceeded } = this.props;
        //console.log(this.props);
        return (
            <form onSubmit={handleSubmit}>
              <Typography variant="h6" color="primary">Datos generales</Typography>
                <GridContainer>
                  <GridItem md={6}>
                    <Field
                        name="ruc"
                        label="RUC"
                        formControlProps={{
                            fullWidth: true
                        }}
                        load={this.state.load}
                        onBlur={this.handleBlur}
                        component={TextField}
                        normalize={normalizeNumber(11)}
                    />
                  </GridItem>
                </GridContainer>
                <GridContainer>  
                  <GridItem md={6}>
                    <Field
                        name="businessName"
                        label="Razón Social"
                        formControlProps={{
                            fullWidth: true
                        }}
                        component={TextField}
                    />
                  </GridItem>
                  <GridItem md={6}>
                    <Field
                        name="tradeName"
                        label="Nombre Comercial"
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
                        name="email"
                        label="Correo electronico"
                        formControlProps={{
                            fullWidth: true
                        }}
                        component={TextField}
                    />
                  </GridItem>
                  <GridItem md={6}>
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
                </GridContainer>
                <Typography variant="h6" color="primary">Domicilio</Typography>
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
                        // onChange={this.getProvincesWithCodeDep(codDep, this.state.codDep)}
                        suggestions={departments}
                    />                                        
                  </GridItem>
                  <GridItem md={4}>
                    <Field
                        name="codPro"
                        label="Provicia"
                        formControlProps={{
                            fullWidth: true
                        }}
                        component={SelectField}
                        onChange={this.getDistrictWithCodeProv()}
                        //onChange={this.getDistrictWithCodeProv(codPro, this.state.codPro)}
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
                        label="Domicilio Fiscal"
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
                        <Button disabled={submitting || pristine } variant="contained" color="secondary" onClick={reset}>Cancelar</Button>
                    </GridItem>
                </GridContainer>
                <Prompt
                    when={!pristine && !submitSucceeded}
                    message="Se perderán los datos si continúa"></Prompt>
                <SweetAlert 
                    show={this.state.show}
                    title="Información"
                    html
                    text={"Ingrese un RUC diferente"}
                    onConfirm={()=> this.setState({show: false})}
                />

            </form>
        );
    }
}

const CompanyFormEdit = reduxForm(
  {
    form: 'CompanyForm',
    validate,
  }
)(CompanyForm);

const selector = formValueSelector('CompanyForm');

const mapStateToProps = state => ( {
  departments: getDepartments(state),
  provinces: getProvinces(state),
  districts: getDistricts(state),
  codDep: selector(state,'codDep'),
  codPro: selector(state,'codPro'),
  //codDis: selector(state,'codDis'),
});

export default connect(mapStateToProps,{
    setCodDep,
    setCodPro,
    changeValue: change,
    registerInput: registerField,
})(setPropsAsInitial(CompanyFormEdit));

