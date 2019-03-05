import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchConcept, updateConcept } from '../../../actions/product';
import GridContainer from '../../../components/Grid/GridContainer';
import GridItem from '../../../components/Grid/GridItem';
import Box from '../../../components/Box';
import { withRouter } from 'react-router-dom';
import { SubmissionError } from 'redux-form';
import SweetAlert from 'sweetalert-react';
import ProductForm from '../../../components/Form/ProductForm';

class ConceptEdit extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      show: false
    };
  }
  componentDidMount() {
    //console.log(this.props);
   this.props.fetchConcept(this.props.match.params.identifier);
  }

  handleSubmit = values => {
    const { identifier } = values;
    this.props.updateConcept(identifier, values).then(r => {
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
   const {concept} = this.props;
    return (
      <GridContainer>
        <GridItem md={12}>
          <Box 
            title="Registrar nueva sede"
          >
            <ProductForm data={concept} onSubmit={this.handleSubmit} 
                      onSubmitSuccess={this.handleOnSubmitSuccess}
                      onBack={this.handleOnBack}></ProductForm>            
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
  concept: state.concept.only,
})
export default withRouter(connect(mapStateToProps,{
  fetchConcept,
  updateConcept
})(ConceptEdit));