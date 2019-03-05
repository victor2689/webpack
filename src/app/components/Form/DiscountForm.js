import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import GridContainer from '../Grid/GridContainer';
import GridItem from '../Grid/GridItem';
import RegularButton from '../CustomButtons/Button';
import TextField from '../CustomInput/TextField';
import SelectField from '../CustomInput/SelectField';

const validate = values => {
    const errors = {};
    const requiredFields = [
      'type',
      'name',
      'amount',
      'description'
    ];
    requiredFields.forEach(field => {
      if (!values[field]) {
        errors[field] = 'Requerido';
      }
    });

    return errors;
  }
  const suggestions = [
    { label: 'Unico hijo' },
    { label: 'Hermano' },
    { label: 'Especial' },
    ].map(suggestion => ({
        value: suggestion.label,
        label: suggestion.label,
      }));
class DiscountForm extends Component {
    render() {
        const { handleSubmit } = this.props;
        return (
            <form onSubmit={handleSubmit}>
                <GridContainer>
                    <GridItem md={12}>
                        <Field 
                            name="type"
                            label="Tipo"
                            formControlProps={{
                                fullWidth: true
                            }}
                            component={SelectField}
                            suggestions={suggestions}
                        />
                    </GridItem>
                    <GridItem md={12}>
                        <Field 
                            name="name"
                            label="Nombre"
                            formControlProps={{
                                fullWidth: true
                            }}
                            component={TextField} 
                        />
                    </GridItem>
                    <GridItem md={12}>
                        <Field 
                            name="amount"
                            label="Monto"
                            formControlProps={{
                                fullWidth: true
                            }}
                            component={TextField} 
                        />
                    </GridItem>
                    <GridItem md={12}>
                        <Field 
                            name="description"
                            label="Descripcion"
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
const DiscountFormEdit = reduxForm(
    {
      form: 'DiscountForm',
      validate
    }
  )(DiscountForm);
export default connect()(DiscountFormEdit);
