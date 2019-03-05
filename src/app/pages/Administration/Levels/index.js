import React, { Component, Fragment } from 'react';
import GridContainer from '../../../components/Grid/GridContainer';
import GridItem from '../../../components/Grid/GridItem';
import { Link } from 'react-router-dom';
import Table from '../../../components/Table';
import { connect } from 'react-redux';
import Box from '../../../components/Box';
import { fetchLevels, deleteLevel } from '../../../actions/level';
import { Create, Delete } from '@material-ui/icons';
import { Button, Fab, Tooltip } from '@material-ui/core';
import SweetAlert from 'sweetalert-react';

class Levels extends Component {
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
          <Link to={`/administration/levels/${record.identifier}/edit`}>
            <Tooltip title="Editar">
              <Fab size="small" color="primary" ><Create fontSize="small" /></Fab>
            </Tooltip>
          </Link>
          <Tooltip onClick={() => this.setState({show:true, identifier: record.identifier})} title="Eliminar nivel">
              <Fab size="small" color="primary" ><Delete fontSize="small" /></Fab>
          </Tooltip>
        </Fragment>
      ),
    },
  ];

  componentDidMount() {
    this.props.fetchLevels();  
  }

  delete = id => {
    this.props.deleteLevel(id).then(r =>{
      this.props.fetchLevels();
    });
  }
  
  render() {
    const { levels } = this.props;
    return (
      <GridContainer>
        <GridItem md={12}>
          <Box title="Niveles" color="box-primary">
            <div className="tableList">
              <div className="tableListOperator">
              <Link to="/administration/levels/new">
                <Button variant="contained" size="small" color="primary">Nuevo</Button>  
              </Link>
              </div>
              <Table data={levels} columns={this.columns}> </Table>
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
          onCancel={
            () => {
              this.setState({show:false})
            }
          }
        ></SweetAlert>
      </GridContainer>
    );
  }
}

const mapStateToProps = state => ({
  levels: state.level.data,
});

export default connect(mapStateToProps,{
  fetchLevels,
  deleteLevel
})(Levels);
