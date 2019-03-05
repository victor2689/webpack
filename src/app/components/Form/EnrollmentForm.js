import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Field, FieldArray, reduxForm, arrayPush, arrayRemove, change, formValueSelector } from 'redux-form';
import GridContainer from '../Grid/GridContainer';
import GridItem from '../Grid/GridItem';
import RegularButton from '../CustomButtons/Button';
import TextField from '../CustomInput/TextField';
import Autocomplete from '../CustomInput/Autocomplete';
import TablePayout from '../Payout/TablePayout';
import DatePickerField from '../CustomInput/DatePickerField';

const validate = values => {
    const errors = {};

    return errors;
}

const suggestionsStudents = [
    { value:'1', label: 'Victor Urbina Eugenio' },
    { value:'2', label: 'Juan Perez' },
    { value:'3', label: 'Pablito Campos' },
];
const suggestionsEmpower = [
    { value:'1', label: 'Victor Urbina Eugenio' },
    { value:'2', label: 'Juan Perez' },
    { value:'3', label: 'Pablito Campos' },
];
const suggestionsLevel = [
    { value:'1', label: 'Secundaria 5to' },
    { value:'2', label: 'Secundaria 5to' },
    { value:'3', label: 'Secundaria 5to' },
];
class EnrollmentForm extends Component {

    renderDetails = (props) => {
        const { fields, meta: {error, submitFailed}} = props;
        const { detail } = this.props;
        console.log(detail)
        return (
            <GridContainer>
                <GridItem md={12}>
                    <Field 
                        name={`detail.concept`}
                        formControlProps={{
                            fullWidth: true
                        }}
                        component={TextField} 
                        label="Concepto"
                    />
                </GridItem>
                <GridItem md={12}>
                    <Field 
                        name={`detail.student`}
                        component={Autocomplete} 
                        label="Alumno"
                        formControlProps={{
                            fullWidth: true
                        }}
                        suggestions={suggestionsStudents}
                    />
                </GridItem>
                <GridItem md={12}>
                    <Field 
                        name={`detail.date`}
                        formControlProps={{
                            fullWidth: true
                        }}
                        component={DatePickerField} 
                        label="Fecha"
                    />
                </GridItem>
                <GridItem md={12}>
                    <Field 
                        name={`detail.level`}
                        formControlProps={{
                            fullWidth: true
                        }}
                        component={Autocomplete} 
                        label="Nivel"
                        suggestions={suggestionsLevel}
                    />
                </GridItem>
            </GridContainer>
        );
    }

    setDetails = ( ) =>{
        console.log("detail");
        const { detail } = this.props;
        if(detail.service && detail.amount){
            this.props.pushArray('PayoutForm', 'details', detail);
            this.props.changeValue('PayoutForm','detail',{});
        }
    };
    removeDetail = index => {
        this.props.removeArray('PayoutForm', 'details', index);
    }
    render() {

        const { handleSubmit, details, detail } = this.props;
        // console.log(details);
        return (
            <form onSubmit={handleSubmit}>
                <GridContainer>
                    <GridItem md={8}>
                        <FieldArray name="details"
                            component={this.renderDetails}
                        />
                        <GridItem>
                            <button type="button" onClick={this.setDetails}>Agregar</button>
                        </GridItem>
                        <GridContainer>
                            <GridItem md={12}>
                                <TablePayout
                                    values={details}
                                    onRemoveDetail={this.removeDetail}
                                />
                            </GridItem>
                        </GridContainer>
                    </GridItem>
                    <GridItem md={4}>
                        <Field 
                            name="empower"
                            component={Autocomplete} 
                            label="Apoderado"
                            formControlProps={{
                                fullWidth: true
                              }}
                            suggestions={suggestionsEmpower}
                        />
                    </GridItem>
                </GridContainer>
                <GridContainer>
                    <GridItem md={4}>
                        <RegularButton color="info" type="submit">Guardar</RegularButton>
                    </GridItem>
                </GridContainer>
            </form>
        );
    }
}

const selector = formValueSelector('PayoutForm');
const mapStateToProps = state => ({
    details: selector(state,'details'),
    detail: selector(state, 'detail')
});
const EnrollmentFormEdit = reduxForm(
    {
      form: 'EnrollmentForm',
      validate
    }
  )(EnrollmentForm);
export default connect(mapStateToProps,{
    pushArray: arrayPush,
    changeValue: change,
    removeArray: arrayRemove,
})(EnrollmentFormEdit);
