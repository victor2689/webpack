import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Field, FieldArray, reduxForm, arrayPush, arrayRemove, change, formValueSelector } from 'redux-form';
import GridContainer from '../Grid/GridContainer';
import GridItem from '../Grid/GridItem';
import RegularButton from '../CustomButtons/Button';
import TextField from '../CustomInput/TextField';
import Autocomplete from '../CustomInput/Autocomplete';
import TablePayout from '../Payout/TablePayout';

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
const suggestionsService = [
    { value:'1', label: 'Luz' },
    { value:'2', label: 'Agua' },
    { value:'3', label: 'Otros' },
];
class PayoutForm extends Component {

    renderDetails = (props) => {
        const { fields, meta: {error, submitFailed}} = props;
        const { detail } = this.props;
        console.log(detail)
        return (
            <GridContainer>
                <GridItem md={12}>
                    <Field 
                        name={`detail.service`}
                        component={Autocomplete} 
                        label="Servicio"
                        formControlProps={{
                            fullWidth: true
                        }}
                        suggestions={suggestionsService}
                    />
                </GridItem>
                <GridItem md={12}>
                    <Field 
                        name={`detail.amount`}
                        formControlProps={{
                            fullWidth: true
                        }}
                        component={TextField} 
                        label="monto"
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
        console.log(details);
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
const PayoutFormEdit = reduxForm(
    {
      form: 'PayoutForm',
      validate
    }
  )(PayoutForm);
export default connect(mapStateToProps,{
    pushArray: arrayPush,
    changeValue: change,
    removeArray: arrayRemove,
})(PayoutFormEdit);
