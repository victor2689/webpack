import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchClassroom, updateClassroom } from '../../../actions/classroom';
import GridContainer from '../../../components/Grid/GridContainer';
import GridItem from '../../../components/Grid/GridItem';
import Box from '../../../components/Box';
import { withRouter } from 'react-router-dom';
import SweetAlert from 'sweetalert-react';
import ClassroomForm from '../../../components/Form/ClassroomForm';

class ClassroomEdit extends Component {
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
    console.log(this.props.match.params.identifier);
   this.props.fetchClassroom(this.props.match.params.identifier);
  }

  handleSubmit = values => {
    const { identifier } = values;
    this.props.updateClassroom(identifier, values).then(r => {
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
   const {classroom} = this.props;
    return (
      <GridContainer>
        <GridItem md={12}>
          <Box 
            title="Actualizar Aula"
          >
            <ClassroomForm 
              data={classroom} 
              onSubmit={this.handleSubmit} 
            ></ClassroomForm>            
          </Box>
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
        </GridItem>
      </GridContainer>
    );
  }
}
const mapStateToProps = (state) => ({
  classroom: state.classroom.only,
})
export default withRouter(connect(mapStateToProps,{
  fetchClassroom,
  updateClassroom
})(ClassroomEdit));