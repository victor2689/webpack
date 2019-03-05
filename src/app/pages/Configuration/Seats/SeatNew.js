import React, { Component } from 'react';
import { connect } from 'react-redux';
import SeatForm from '../../../components/Form/SeatForm';
import { insertSeat } from '../../../actions/seat';
import GridContainer from '../../../components/Grid/GridContainer';
import GridItem from '../../../components/Grid/GridItem';
import Box from '../../../components/Box';
import { withRouter } from 'react-router-dom';
import { SubmissionError } from 'redux-form';
import SweetAlert from 'sweetalert-react';

class SeatNew extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      show: false
    };
  }
  componentDidMount() {
   
  }

  handleSubmit = values => {
    this.props.insertSeat(values).then(r => {
      if(r.error){
        throw new SubmissionError(r.payload);
      }
    });
  }

  handleOnSubmitSuccess = () => {
    this.setState({ show: true });
  }

  handleOnBack = () => {
    this.props.history.goBack();
  }
  render() {
    return (
      <GridContainer>
        <GridItem md={12}>
          <Box 
            title="Registrar nueva sede"
          >
            <SeatForm onSubmit={this.handleSubmit} 
              onSubmitSuccess={this.handleOnSubmitSuccess}
            ></SeatForm> 
          </Box>
        </GridItem>
        <SweetAlert
          show={this.state.show}
          title="Correcto"
          type="success"
          html
          text={"Los datos se guardaron con éxito."}
          onConfirm={() => {
            this.setState({show:false})
            this.props.history.goBack();
            }}
        ></SweetAlert>
      </GridContainer>
    );
  }
}

export default withRouter(connect(null,{
  insertSeat
})(SeatNew));