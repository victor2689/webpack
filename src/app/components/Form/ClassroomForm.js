import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import GridContainer from '../Grid/GridContainer';
import GridItem from '../Grid/GridItem';
import TextField from '../CustomInput/TextField';
import { Button } from '@material-ui/core';
import { setPropsAsInitial } from '../../helpers/setPropsAsInitial';
import SelectField from '../CustomInput/SelectField';
import { loadLevels, loadGrades } from '../../actions/complement';
import { toUpper } from '../../utils/utils';

const validate = values => {
    const errors = {};
    const requiredFields = [
      'level',
      'grade',
      'classRoom',
      'capacity'
    ];
    requiredFields.forEach(field => {
      if (!values[field]) {
        errors[field] = 'Requerido';
      }
    });
    return errors;
  }

class ClassroomForm extends Component {

    componentDidMount() {
        this.props.loadLevels();
        this.props.loadGrades();
    }
    
    render() {
        const { 
          handleSubmit,
          pristine,
          submitting,
          reset,
          levels,
          grades } = this.props;
        return (
            <form onSubmit={handleSubmit}>
                <GridContainer>
                    <GridItem md={6}>
                        <Field 
                            name="levelId"
                            label="Nivel"
                            formControlProps={{
                                fullWidth: true
                            }}
                            component={SelectField}
                            suggestions={levels} 
                        />
                    </GridItem>
                    <GridItem md={6}>
                        <Field 
                            name="gradeId"
                            label="Grado"
                            formControlProps={{
                                fullWidth: true
                            }}
                            component={SelectField}
                            suggestions={grades} 
                        />
                    </GridItem>
                </GridContainer>
                <GridContainer>
                    <GridItem md={6}>
                        <Field 
                            name="classroom"
                            label="Sección"
                            formControlProps={{
                                fullWidth: true
                            }}
                            component={TextField}
                            parse={toUpper}
                        />
                    </GridItem>
                    <GridItem md={6}>
                        <Field 
                            name="capacity"
                            label="Vacantes"
                            formControlProps={{
                                fullWidth: true
                            }}
                            component={TextField}
                            type="number" 
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
const ClassroomFormEdit = reduxForm(
  {
    form: 'ClassroomForm',
    validate
  }
)(ClassroomForm);

const mapStateToProps = state => ({
  levels: state.complement.levels,
  grades: state.complement.grades,
});

export default connect(mapStateToProps,{
    loadLevels,
    loadGrades,
})(setPropsAsInitial(ClassroomFormEdit));
