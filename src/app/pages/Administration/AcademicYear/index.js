import React, { Component, Fragment } from 'react';
import GridContainer from '../../../components/Grid/GridContainer';
import GridItem from '../../../components/Grid/GridItem';
import { Link } from 'react-router-dom';
import Table from '../../../components/Table';
import { connect } from 'react-redux';
import { Create, Delete } from '@material-ui/icons';
import { Button, Fab, Tooltip } from '@material-ui/core';
import Box from '../../../components/Box';
import SweetAlert from 'sweetalert-react';
import { fetchAcademicYears } from '../../../actions/academicYear';


class AcademicYear extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
          show: false,
          identifier: ''
        };
    }
    columns = [
        {
          title: 'Año',
          dataIndex: 'name',
        },
        {
          title: 'Fecha inicio',
          dataIndex: 'initDate',
        },
        {
          title: 'Fecha final',
          dataIndex: 'endDate',
        },
        {
            title: 'Estado',
            dataIndex: 'state',
        },
        {
          title: 'Acciones',
          render: (text, record) => (
            <Fragment>
                <Link to={`/administration/academicyears/${record.identifier}/edit`}>
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
        this.props.fetchAcademicYears();
    }

    delete = id => {
        // this.props.deleteAcademicYear(id).then(r =>{
        //     this.props.fetchAcademicYears();
        // });
    }

    render() {
        const { academicyears } = this.props;
        console.log(academicyears);
        return (
            <GridContainer>
                <GridItem md={12}>
                    <Box title="Año academico" color="box-primary">
                        <div className="tableList">
                            <div className="tableListOperator">
                                <Link to="/administration/academicyears/new">
                                    <Button variant="contained" size="small" color="primary">
                                        Nuevo
                                    </Button>
                                </Link>
                            </div>
                            <Table
                            data={academicyears}
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
    academicyears: state.academicyear.data
})
export default connect(mapStateToPros,{
    fetchAcademicYears,
    // deleteAcademicYear
})(AcademicYear);