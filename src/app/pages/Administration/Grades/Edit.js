import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateGrade, fetchGrade } from '../../../actions/grade';
import GridContainer from '../../../components/Grid/GridContainer';
import GridItem from '../../../components/Grid/GridItem';
import Box from '../../../components/Box';
import { withRouter } from 'react-router-dom';
import SweetAlert from 'sweetalert-react';
import BasicForm from '../../../components/Form/BasicForm';

class GradeEdit extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      sweet:{
        show: false,
        back: false
      }
    };
  }
  
  componentDidMount() {
    this.props.fetchGrade(this.props.match.params.identifier);
  }

  handleSubmit = values => {
    const { identifier } = values;
    this.props.updateGrade(identifier, values).then(r => {
      this.setState(
        { 
          sweet:{
            show: true, 
            title: 'Correcto',
            type: 'success',
            text: 'Los datos se guardaron con éxito.',
            back: true
          }
        });
    }).catch(r => {
      this.setState(
        { 
          sweet:{
            show: true, 
            title: 'Error',
            type: 'error',
            text: r,
            back: false
          }
        });
    });
  }

  render() {
    const { grade } = this.props;
    return (
      <GridContainer>
        <GridItem md={12}>
          <Box 
            title="Actualizar grado"
          >
            <BasicForm data={grade} onSubmit={this.handleSubmit} 
            ></BasicForm> 
          </Box>
        </GridItem>
        <SweetAlert
          show={this.state.sweet.show}
          title={this.state.sweet.title ? this.state.sweet.title: ''}
          type={this.state.sweet.type}
          html
          text={this.state.sweet.text}
          onConfirm={() => {
            if(this.state.sweet.back) {this.props.history.goBack()}
            this.setState({sweet:{show:false}});
            }}
        ></SweetAlert>
      </GridContainer>
    );
  }
}
const mapStateToProps = state => ({
  grade : state.grade.only

})
export default withRouter(connect(mapStateToProps,{
  updateGrade,
  fetchGrade
})(GradeEdit));