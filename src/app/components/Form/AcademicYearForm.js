import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import GridContainer from '../Grid/GridContainer';
import GridItem from '../Grid/GridItem';
import TextField from '../CustomInput/TextField';
import DatePickerField from '../CustomInput/DatePickerField';
import MultiCheckBox from '../CustomInput/MultiCheckBox';
import { setPropsAsInitial } from '../../helpers/setPropsAsInitial';
import { loadClassrooms } from '../../actions/complement';
import { Button } from '@material-ui/core';

const validate = values => {
    const errors = {};
    const requiredFields = [
      'year',
      'dateinit',
      'dateend'
    ];
    requiredFields.forEach(field => {
      if (!values[field]) {
        errors[field] = 'Requerido';
      }
    });
    return errors;
  }

class AcademicYearForm extends Component {
    componentDidMount() {
        this.props.loadClassrooms();
    }
    
    render() {
        const { handleSubmit, pristine, submitting, reset, classrooms } = this.props;
        return (
            <form onSubmit={handleSubmit}>
                <GridContainer>
                    <GridItem md={4}>
                        <Field 
                            name="name"
                            label="Año escolar"
                            formControlProps={{
                                fullWidth: true
                            }}
                            component={TextField} 
                        />
                    </GridItem>
                    <GridItem md={4}>
                        <Field 
                            name="initdate"
                            label="Fecha inicio"
                            formControlProps={{
                                fullWidth: true
                            }}
                            component={DatePickerField} 
                            datePickerProps={{
                                //adornmentPosition:'start'
                            }}
                        />
                    </GridItem>
                    <GridItem md={4}>
                        <Field 
                            name="enddate"
                            label="Fecha final"
                            formControlProps={{
                                fullWidth: true
                            }}
                            component={DatePickerField} 
                            datePickerProps={{
                                //adornmentPosition:'end'
                            }}
                        />
                    </GridItem>
                </GridContainer>
                <GridContainer>
                    <GridItem md={6}>
                        <Field 
                            name="classrooms"
                            text="Aulas"
                            component={MultiCheckBox} 
                            // normalize={normalizeCheckboxValues}
                            options={classrooms}
                        />
                    </GridItem>
                </GridContainer>
                <GridContainer>
                    <GridItem md={12}>
                        <Button disabled={pristine || submitting} variant="contained" color="primary" size="small" onClick={handleSubmit}>Guardar</Button>
                        <Button disabled={pristine || submitting} variant="contained" color="secondary" size="small" onClick={reset}>Guardar</Button>

                    </GridItem>
                </GridContainer>
            </form>
        );
    }
}
const AcademicYearFormEdit = reduxForm(
    {
      form: 'AcademicYearForm',
      validate
    }
)(AcademicYearForm);

const mapStateToProps = state => ({
    classrooms: state.complement.classrooms
})

export default connect(mapStateToProps, {
    loadClassrooms
})(setPropsAsInitial(AcademicYearFormEdit));
