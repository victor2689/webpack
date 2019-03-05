import React, { Component } from 'react';
import { connect } from 'react-redux';
import { insertClassroom } from '../../../actions/classroom';
import GridContainer from '../../../components/Grid/GridContainer';
import GridItem from '../../../components/Grid/GridItem';
import Box from '../../../components/Box';
import { withRouter } from 'react-router-dom';
import SweetAlert from 'sweetalert-react';
import ClassroomForm from '../../../components/Form/ClassroomForm';

class ClassroomNew extends Component {
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
   
  }

  handleSubmit = values => {
    this.props.insertClassroom(values).then(res => {
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
    return (
      <GridContainer>
        <GridItem md={12}>
          <Box 
            title="Registrar Aula"
          >
            <ClassroomForm 
              onSubmit={this.handleSubmit} 
            ></ClassroomForm> 
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

export default withRouter(connect(null,{
  insertClassroom
})(ClassroomNew));