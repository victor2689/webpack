import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import GridContainer from '../Grid/GridContainer';
import GridItem from '../Grid/GridItem';
import TextField from '../CustomInput/TextField';
import { Button } from '@material-ui/core';
import { setPropsAsInitial } from '../../helpers/setPropsAsInitial';
import { Prompt } from 'react-router-dom';
import { toUpper } from '../../utils/utils';

const validate = values => {
  const errors = {};
  const requiredFields = [
    'name',
  ];
  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = 'Requerido';
    }
  });
  return errors;
}



class BasicForm extends Component {
    render() {
        const { handleSubmit, pristine, submitting, reset, submitSucceeded } = this.props;
        return (
            <form onSubmit={handleSubmit}>
                <GridContainer>
                    <GridItem md={4}>
                        <Field 
                            name="name"
                            label="Descripción"
                            formControlProps={{
                                fullWidth: true
                            }}
                            component={TextField}
                            parse={toUpper}
                        />
                    </GridItem>
                </GridContainer>
                <GridContainer>
                    <GridItem md={12}>
                        <Button disabled={ pristine || submitting } variant="contained" color="primary" onClick={handleSubmit}>Guardar</Button>
                        <Button disabled={ pristine || submitting } variant="contained" color="secondary" onClick={reset}>Guardar</Button>
                    </GridItem>
                </GridContainer>
                <Prompt
                  when={!pristine && !submitSucceeded}
                  message="Se perderán los datos si continúa"></Prompt>
            </form>
        );
    }
}
const BasicFormEdit = reduxForm(
    {
      form: 'BasicForm',
      validate
    }
  )(BasicForm);
export default connect()(setPropsAsInitial(BasicFormEdit));
