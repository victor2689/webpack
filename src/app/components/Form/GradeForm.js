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
      'level',
      'grade',
      'section'
    ];
    requiredFields.forEach(field => {
      if (!values[field]) {
        errors[field] = 'Requerido';
      }
    });

    return errors;
  }
  const suggestions = [
    { label: 'Inicial' },
    { label: 'Primaria' },
    { label: 'Secundaria' },
    ].map(suggestion => ({
        value: suggestion.label,
        label: suggestion.label,
      }));
class GradeForm extends Component {
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
                            component={SelectField}
                            suggestions={suggestions}
                        />
                    </GridItem>
                    <GridItem md={12}>
                        <Field 
                            name="grade"
                            label="Grado"
                            formControlProps={{
                                fullWidth: true
                            }}
                            component={TextField} 
                        />
                    </GridItem>
                    <GridItem md={12}>
                        <Field 
                            name="section"
                            label="Sección"
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
const GradeFormEdit = reduxForm(
    {
      form: 'GradeForm',
      validate
    }
  )(GradeForm);
export default connect()(GradeFormEdit);
