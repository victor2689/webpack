import React, { Component, Fragment } from 'react';
import GridContainer from '../../../components/Grid/GridContainer';
import GridItem from '../../../components/Grid/GridItem';
import { Link } from 'react-router-dom';
import Table  from '../../../components/Table';
import { connect } from 'react-redux';
import { Create, Delete } from '@material-ui/icons';
import Box from '../../../components/Box';
import { Button, Fab, Tooltip } from '@material-ui/core';
import { fetchClassrooms, deleteClassroom } from '../../../actions/classroom';
import SweetAlert from 'sweetalert-react';

class Classrooms extends Component {
    constructor(props, context) {
      super(props, context);
      this.state = {
        show: false,
        identifier: ''
      };
    }
    columns = [
        {
          title: 'Nivel',
          dataIndex: 'level.data.name',
        },
        {
          title: 'Grado',
          dataIndex: 'grade.data.name',
        },
        {
          title: 'Sección',
          dataIndex: 'classroom',
        },
        {
          title: 'Capacidad',
          dataIndex: 'capacity',
        },
        {
          title: 'Acciones',
          render: (text, record) => (
            <Fragment>
                <Link to={`/administration/classrooms/${record.identifier}/edit`}>
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
        this.props.fetchClassrooms();
    }

    delete = id => {
      this.props.deleteClassroom(id).then(r =>{
        this.props.fetchClassrooms();
      });
    }

    render() {
        const { classrooms } = this.props;
        return (
            <GridContainer>
                <GridItem md={12}>
                    <Box title="Aulas" color="box-primary">
                        <div className="tableList">
                            <div className="tableListOperator">
                            <Link to="/administration/classrooms/new">
                                <Button variant="contained" size="small" color="primary">
                                    Nuevo
                                </Button>
                            </Link>
                            </div>
                            <Table
                            data={classrooms}
                            columns={this.columns}
                            />
                        </div>
                    </Box>
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
                </GridItem>
            </GridContainer>
        );
    }
}

const mapStateToPros = state => ({
    classrooms: state.classroom.data
})

export default connect(mapStateToPros,{
    fetchClassrooms,
    deleteClassroom
})(Classrooms);





