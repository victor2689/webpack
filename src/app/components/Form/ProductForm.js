import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import GridContainer from '../Grid/GridContainer';
import GridItem from '../Grid/GridItem';
import RegularButton from '../CustomButtons/Button';
import TextField from '../CustomInput/TextField';
import { Button } from '@material-ui/core';

const validate = values => {
    const errors = {};
    const requiredFields = [
      'product',
      'cost',
    ];
    requiredFields.forEach(field => {
      if (!values[field]) {
        errors[field] = 'Requerido';
      }
    });
    return errors;
  }

class ProductForm extends Component {
    render() {
        const { handleSubmit, pristine, submitting, reset } = this.props;
        return (
            <form onSubmit={handleSubmit}>
                <GridContainer>
                    <GridItem md={4}>
                        <Field 
                            name="name"
                            label="Concepto"
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
                            name="price"
                            label="Costo"
                            formControlProps={{
                                fullWidth: true
                            }}
                            component={TextField} 
                        />
                    </GridItem>
                </GridContainer>
                <GridContainer>
                    <GridItem md={12}>
                        <Button disabled={ pristine || submitting } variant="contained" color="primary" onClick={handleSubmit}>Guardar</Button>
                        <Button disabled={ pristine || submitting } variant="contained" color="secondary" onClick={reset}>Guardar</Button>
                    </GridItem>
                </GridContainer>
            </form>
        );
    }
}
const ProductFormEdit = reduxForm(
    {
      form: 'ProductForm',
      validate
    }
  )(ProductForm);
export default connect()(ProductFormEdit);
