import React, { Component } from 'react';
import { connect } from 'react-redux';
import GridContainer from '../../../components/Grid/GridContainer';
import GridItem from '../../../components/Grid/GridItem';
import { insertBusinessSubject } from '../../../actions/service';
import Box from '../../../components/Box';
import { withRouter } from 'react-router-dom';
import { SubmissionError } from 'redux-form';
import { SUBJECT_TYPE_PARENT } from '../../../Constants';
import RepresentativeForm from '../../../components/Form/RepresentativeForm';

class NewParent extends Component {

  componentDidMount() {
   
  }

  handleSubmit = values => {
    values.subjectType = SUBJECT_TYPE_PARENT;
    values.state = 1;
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
            title="Registro de Apoderados"
          >
            <RepresentativeForm onSubmit={this.handleSubmit} 
              onSubmitSuccess={this.handleOnSubmitSuccess}
              onBack={this.handleOnBack}></RepresentativeForm> 
          </Box>
        </GridItem>
      </GridContainer>
    );
  }
}

export default withRouter(connect(null,{
})(NewParent));