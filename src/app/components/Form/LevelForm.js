import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import GridContainer from '../Grid/GridContainer';
import GridItem from '../Grid/GridItem';
import RegularButton from '../CustomButtons/Button';
import TextField from '../CustomInput/TextField';

const validate = values => {
    const errors = {};
    const requiredFields = [
      'level'
    ];
    requiredFields.forEach(field => {
      if (!values[field]) {
        errors[field] = 'Requerido';
      }
    });

    return errors;
}
class LevelForm extends Component {
    render() {
        const { handleSubmit } = this.props;
        return (
            <form onSubmit={handleSubmit}>
                <GridContainer>
                    <GridItem md={12}>
                        <Field 
                            name="level"
                            label="Nivel"
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
const LevelFormEdit = reduxForm(
    {
      form: 'LevelForm',
      validate
    }
  )(LevelForm);
export default connect()(LevelFormEdit);
