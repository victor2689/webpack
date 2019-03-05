import React ,{ Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { Link } from 'react-router-dom';
import GridContainer from '../../components/Grid/GridContainer';
import GridItem from '../../components/Grid/GridItem';
import TextField from '../../components/CustomInput/TextField';
import Button from "../../components/CustomButtons/Button";

const validate = values => {
    const errors = {};
    const requiredFields = [
      'user',
      'password'
    ];
    requiredFields.forEach(field => {
      if (!values[field]) {
        errors[field] = 'Requerido';
      }
    });
    
    return errors;
  }

const LoginForm = props => {
    const { handleSubmit, pristine, submitting, logo } = props;
    return (
        <form onSubmit={handleSubmit} className="form-horizontal">
            <Link to='/' className="text-center db">
                <img alt="logo" className="logo" src={logo} />
                <span className="title">Total Soft</span>
            </Link>
            <div className='desc'>Lo hacemos facil</div>
            <GridContainer>
                <GridItem md={12} className="margin-top-40">
                    <Field
                    name="username"
                    label="Usuario"
                    formControlProps={{
                        fullWidth: true
                    }}
                    component={TextField}>
                    </Field>
                </GridItem>
                <GridItem md={12} className="margin-bottom-20">  
                    <Field
                    name="password"
                    label="Password"
                    formControlProps={{
                        fullWidth: true
                    }}
                    component={TextField}
                    type="password"
                    >
                    </Field>
                </GridItem>
                <GridItem md={12}> 
                    <Button type="submit" disabled={pristine || submitting } color="primary" block round size="lg">Ingresar</Button>
                </GridItem>
            </GridContainer>
        </form>
    );
};
export default reduxForm(
    {
      form: 'LoginForm',
      validate
    }
)(LoginForm);