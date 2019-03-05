import React, { Component, Fragment } from 'react';
import GridContainer from '../../../components/Grid/GridContainer';
import GridItem from '../../../components/Grid/GridItem';
import { Link } from 'react-router-dom';
import Table from '../../../components/Table';
import { connect } from 'react-redux';
import Box from '../../../components/Box';
import { fetchGrades, deleteGrade } from '../../../actions/grade';
import { Create, Delete } from '@material-ui/icons';
import { Button, Fab, Tooltip } from '@material-ui/core';
import SweetAlert from 'sweetalert-react';

class Grades extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      show: false,
      identifier: ''
    };
  }
  columns = [
    {
      title: 'Descripción',
      dataIndex: 'name',
      sorter: (a,b) => a.name > b.name,
    },
    {
      title: 'Acciones',
      render: (value, record) => (
        <Fragment>
          <Link to={`/administration/grades/${record.identifier}/edit`}>
            <Tooltip title="Editar">
              <Fab size="small" color="primary" ><Create fontSize="small" /></Fab>
            </Tooltip>
          </Link>
          <Tooltip onClick={() => this.setState({show:true, identifier: record.identifier})} title="Eliminar">
              <Fab size="small" color="primary" ><Delete fontSize="small" /></Fab>
          </Tooltip>
        </Fragment>
      ),
    },
  ];
  componentDidMount() {
    this.props.fetchGrades();  
  }

  delete = id => {
    this.props.deleteGrade(id).then(r => {
      this.props.fetchGrades();
    })
  }
  
  render() {
    const { grades } = this.props;
    return (
      <GridContainer>
        <GridItem md={12}>
          <Box title="Grados" color="box-primary">
            <div className="tableList">
              <div className="tableListOperator">
              <Link to="/administration/grades/new">
                <Button variant="contained" size="small" color="primary">Nuevo</Button>  
              </Link>
              </div>
              <Table data={grades} columns={this.columns}> </Table>
            </div>  
          </Box>
        </GridItem>
        <SweetAlert
          show={this.state.show}
          title="Advertencia"
          type="warning"
          html
          text={"¿Seguro que desea Realizar la Acción Solicitada?"}
          showCancelButton
          cancelButtonText="Cancelar"
          onConfirm={() => {
            this.setState({show:false});
            this.delete(this.state.identifier);
            }}
        ></SweetAlert>
      </GridContainer>
    );
  }
}

const mapStateToProps = state => ({
  grades: state.grade.data,
});

export default connect(mapStateToProps,{
  fetchGrades,
  deleteGrade
})(Grades);
