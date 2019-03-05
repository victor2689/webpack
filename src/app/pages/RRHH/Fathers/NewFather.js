import React, { Component } from 'react';
import { connect } from 'react-redux';
import ParentForm from '../../../components/Form/ParentForm';
import GridContainer from '../../../components/Grid/GridContainer';
import GridItem from '../../../components/Grid/GridItem';
import { insertBusinessSubject } from '../../../actions/service';
import Box from '../../../components/Box';
import { withRouter } from 'react-router-dom';
import { SubmissionError } from 'redux-form';
import { SUBJECT_TYPE_FATHER } from '../../../Constants';
import SweetAlert from 'sweetalert-react';

class NewFather extends Component {

  componentDidMount() {
   
  }

  handleSubmit = values => {
    values.subjectType = SUBJECT_TYPE_FATHER;
    values.state = 1;
    values.sex = 1;
    values.identityDocument= 1;
    insertBusinessSubject(values).then(r => {
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
            title="Registro de padres"
          >
            <ParentForm onSubmit={this.handleSubmit}
              subjectType={SUBJECT_TYPE_FATHER}
              textAlert="un padre"
              onSubmitSuccess={this.handleOnSubmitSuccess}
              onBack={this.handleOnBack}></ParentForm> 
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
})(NewFather));