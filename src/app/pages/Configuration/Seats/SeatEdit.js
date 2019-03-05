import React, { Component } from 'react';
import { connect } from 'react-redux';
import SeatForm from '../../../components/Form/SeatForm';
import { fetchSeat, updateSeat } from '../../../actions/seat';
import GridContainer from '../../../components/Grid/GridContainer';
import GridItem from '../../../components/Grid/GridItem';
import Box from '../../../components/Box';
import { withRouter } from 'react-router-dom';
import { SubmissionError } from 'redux-form';
import SweetAlert from 'sweetalert-react';

class SeatEdit extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      show: false
    };
  }
  componentDidMount() {
    //console.log(this.props);
   this.props.fetchSeat(this.props.match.params.identifier);
  }

  handleSubmit = values => {
    const { identifier } = values;
    this.props.updateSeat(identifier, values).then(r => {
      if(r.error){
        throw new SubmissionError(r.payload);
      }
    });
  }

  handleOnSubmitSuccess = () => {
    this.setState({ show: true });
    //this.props.history.goBack();
  }

  handleOnBack = () => {
    this.props.history.goBack();
  }
  render() {
   const {seat} = this.props;
    return (
      <GridContainer>
        <GridItem md={12}>
          <Box 
            title="Actualizando sede"
          >
            <SeatForm data={seat} onSubmit={this.handleSubmit} 
                      onSubmitSuccess={this.handleOnSubmitSuccess}
                      onBack={this.handleOnBack}></SeatForm>            
          </Box>
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
        </GridItem>
      </GridContainer>
    );
  }
}
const mapStateToProps = (state) => ({
  seat: state.seat.only,
})
export default withRouter(connect(mapStateToProps,{
  fetchSeat,
  updateSeat
})(SeatEdit));