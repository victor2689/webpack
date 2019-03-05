import React, { Component } from 'react';
import { connect } from 'react-redux';
import GridContainer from '../../../components/Grid/GridContainer';
import GridItem from '../../../components/Grid/GridItem';
import Box from '../../../components/Box';
import { withRouter } from 'react-router-dom';
import { SubmissionError } from 'redux-form';
import { SUBJECT_TYPE_STUDENT } from '../../../Constants';
import SweetAlert from 'sweetalert-react';
import StudentForm from '../../../components/Form/StudentForm';
import { insertStudent } from '../../../actions/student';

class NewStudent extends Component {

  componentDidMount() {
   
  }

  handleSubmit = values => {
    values.subjectType = SUBJECT_TYPE_STUDENT;
    values.state = 1;
    values.identityDocument= 1;
    values.parents = [];
    if(values.father){
      values.parents.push(values.father.value);
    }
    if(values.mother){
      values.parents.push(values.mother.value);
    }
    if(values.parent){
      values.parents.push(values.parent.value);
    } 
    this.props.insertStudent(values).then(r => {
      if(r.error){
        throw new SubmissionError(r.payload);
      }
    });
  }

  handleOnSubmitSuccess = () => {
    this.props.history.goBack();
  }

  handleOnBack = () => {
    this.props.history.goBack();
  }

  render() {
    return (
      <GridContainer>
        <GridItem md={12}>
          <Box 
            title="Registro de alumnos"
          >
            <StudentForm onSubmit={this.handleSubmit} 
              onSubmitSuccess={this.handleOnSubmitSuccess}
              onBack={this.handleOnBack}></StudentForm> 
          </Box>
        </GridItem>
        {/* <SweetAlert
          show={this.state.show}
          title="Información"
          html
          text={"Ya existe registrado un padre con este DNI, ingrese otro DNI"}
          onConfirm={this.successSave}
        ></SweetAlert> */}
      </GridContainer>
    );
  }
}

export default withRouter(connect(null,{
  insertStudent
})(NewStudent));