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
    // const requiredFields = [
    //   'employee',
    //   'service',
    //   ''
    // ];
    // requiredFields.forEach(field => {
    //   if (!values[field]) {
    //     errors[field] = 'Requerido';
    //   }
    // });

    return errors;
}

const suggestionsEmployee = [
    { value:'1', label: '45765332 | Victor Urbina Eugenio' },
    { value:'2', label: '55765333 | Juan Perez' },
    { value:'3', label: '65765334 | Pablito Campos' },
];

class SalarieForm extends Component {

    renderDetails = (props) => {
        const { fields, meta: {error, submitFailed}} = props;
        const { detail } = this.props;
        console.log(detail)
        return (
            <GridContainer>
                <GridItem md={12}>
                    <Field 
                        name={`detail.employee`}
                        component={Autocomplete} 
                        label="Trabajador"
                        formControlProps={{
                            fullWidth: true
                        }}
                        suggestions={suggestionsEmployee}
                    />
                </GridItem>
                <GridItem md={12}>
                    <Field 
                        name={`detail.fecha`}
                        formControlProps={{
                            fullWidth: true
                        }}
                        component={DatePickerField} 
                        label="Fecha"
                    />
                </GridItem>
                <GridItem md={12}>
                    <Field 
                        name={`detail.amount`}
                        formControlProps={{
                            fullWidth: true
                        }}
                        component={TextField} 
                        label="Monto"
                    />
                </GridItem>
            </GridContainer>
        );
    }

    setDetails = ( ) =>{
        console.log("detail");
        const { detail } = this.props;
        if(detail.service && detail.amount){
            this.props.pushArray('SalarieForm', 'details', detail);
            this.props.changeValue('SalarieForm','detail',{});
        }
    };
    removeDetail = index => {
        this.props.removeArray('SalarieForm', 'details', index);
    }
    render() {

        const { handleSubmit, details, detail } = this.props;
        console.log(details);
        return (
            <form onSubmit={handleSubmit}>
                <GridContainer>
                    <GridItem md={12}>
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
                    {/* <GridItem md={4}>
                        <Field 
                            name={`detail.employee`}
                            component={Autocomplete} 
                            label="Empleado"
                            formControlProps={{
                                fullWidth: true
                              }}
                            suggestions={suggestionsEmployee}
                        />
                        <Field 
                            name="grade"
                            label="Grado"
                            formControlProps={{
                                fullWidth: true
                            }}
                            component={TextField} 
                        />
                    </GridItem> */}
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

const selector = formValueSelector('SalarieForm');
const mapStateToProps = state => ({
    details: selector(state,'details'),
    detail: selector(state, 'detail')
});
const SalarieFormEdit = reduxForm(
    {
      form: 'SalarieForm',
      validate
    }
  )(SalarieForm);
export default connect(mapStateToProps,{
    pushArray: arrayPush,
    changeValue: change,
    removeArray: arrayRemove,
})(SalarieFormEdit);
