import React, { Component } from 'react';
import { connect } from 'react-redux';
//import { loadPerson } from '../../../actions/person';
import GridContainer from '../../../components/Grid/GridContainer';
import GridItem from '../../../components/Grid/GridItem';
import Box from '../../../components/Box';
import { withRouter } from 'react-router-dom';
import { SubmissionError } from 'redux-form';
import EmployeeForm from '../../../components/Form/EmployeeForm';
import { insertEmployee } from '../../../actions/employee';

class NewEmployee extends Component {
  // constructor(props, context) {
  //   super(props, context);
  //   this.state = {
  //     show: false
  //   };
  // }
  componentDidMount() {
   
  }

  handleSubmit = values => {
    values.state = 1;
    values.identityDocument= 1;
    this.props.insertEmployee(values).then(r => {
      if(r.error){
        throw new SubmissionError(r.payload);
      }
    });
  }

  handleOnSubmitSuccess = () => {
    //this.props.history.goBack();
  }

  handleOnBack = () => {
    this.props.history.goBack();
  }

  render() {
    return (
      <GridContainer>
        <GridItem md={12}>
          <Box 
            title="Registro de Personal"
          >
            <EmployeeForm onSubmit={this.handleSubmit} 
              onSubmitSuccess={this.handleOnSubmitSuccess}
              ></EmployeeForm> 
          </Box>
        </GridItem>
      </GridContainer>
    );
  }
}

export default withRouter(connect(null,{
  //loadPerson,
  insertEmployee
})(NewEmployee));