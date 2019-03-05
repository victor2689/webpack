import React, { Component, Fragment } from 'react';
import GridContainer from '../../../components/Grid/GridContainer';
import GridItem from '../../../components/Grid/GridItem';
import { Link } from 'react-router-dom';
import { Button } from 'antd';
import { connect } from 'react-redux';
import { fetchEmployees } from '../../../actions/employee';
import { setPagination } from '../../../actions/global';
import Table from '../../../components/Table';
import Box from '../../../components/Box';

class Employees extends Component {

    columns = [
        {
            title: 'Tipo',
            dataIndex: 'type',
            sorter: (a,b) => a.type > b.type,
        },
        {
            title: 'Dni',
            dataIndex: 'dni',
            sorter: (a,b) => a.dni > b.dni,
        },
        {
          title: 'Trabajador',
          dataIndex: 'fullName',
          sorter: (a,b) => a.fullName > b.fullName,
        },

        {
            title: 'Dirección',
            dataIndex: 'address',

        },
        {
            title: 'Modalidad de pago',
            dataIndex: 'modeFee',
        },
        {
            title: 'Documento de Pago',
            dataIndex: 'documentFee'
        },
        {
            title: 'Sueldo',
            dataIndex: 'salarie',
            sorter: (a,b) => a.age > b.age,
          },
        // {
        //   title: 'Editar',
        //   render: (text, record) => (
        //     <Fragment>
        //         <RegularButton color="info" >Editar</RegularButton>
        //     </Fragment>
        //   ),
        // },
        // {
        //     title: 'Eliminar',
        //     render: (text, record) => (
        //       <Fragment>
        //         <RegularButton color="danger" >Editar</RegularButton>
        //       </Fragment>
        //     ),
        //   },
    ];
    componentDidMount() {
        this.props.fetchEmployees();
    }
    
    handleStandardTableChange = (pagination, filtersArg, sorter) => {
        const filters = Object.keys(filtersArg).reduce((obj, key) => {
          const newObj = { ...obj };
          newObj[key] = getValue(filtersArg[key]);
          return newObj;
        }, {});
    
        const params = {
          currentPage: pagination.current,
          pageSize: pagination.pageSize,
          ...filters,
        };
        if (sorter.field) {
          params.sorter = `${sorter.field}_${sorter.order}`;
        }
        this.props.setPagination(params);
    };
    handleSelectRows = rows => {
        this.setState({
          selectedRows: rows,
        });
    };

    render() {
        const {  employees } = this.props;
        return (
            <GridContainer>
                <GridItem md={12}>
                    <Box title="Empleados" color="box-primary">
                        <div className="tableList">
                            <div className="tableListOperator">
                            <Link to="/rrhh/employees/new">
                                <Button icon = "plus"
                                        type = "primary"
                                >
                                Nuevo
                                </Button>
                            </Link> 
                            </div>
                            <Table data={employees.data} columns={this.columns} />

                            {/* <StandardTable
                                selectedRows={selectedRows}
                                data={employees}
                                columns={this.columns}
                                onSelectRow={this.handleSelectRows}
                                onChange={this.handleStandardTableChange}
                            /> */}
                        </div>
                    </Box>
                </GridItem>
            </GridContainer>
        );
    }
}
const mapStateToProps = state => ({
    employees: state.employee,
});
export default connect(mapStateToProps,{
    fetchEmployees,
    setPagination
})(Employees);