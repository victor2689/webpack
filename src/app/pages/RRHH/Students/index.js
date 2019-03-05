import React, { Component } from 'react';
import GridContainer from '../../../components/Grid/GridContainer';
import GridItem from '../../../components/Grid/GridItem';
import {
  Button
} from 'antd';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchStudents } from '../../../actions/student';
import { setPagination } from '../../../actions/global';
import Box from '../../../components/Box';
import Table from '../../../components/Table';

class Students extends Component {

    columns = [
        {
            title: 'Dni',
            dataIndex: 'identityNumber',
            sorter: (a,b) => a.identityNumber > b.identityNumber,
        },
        {
          title: 'Alumno',
          dataIndex: 'subject.data.fullName',
          sorter: (a,b) => a.subject.data.fullName > b.subject.data.fullName,
        },
        {
          title: 'Edad',
          dataIndex: 'subject.data.age',
          sorter: (a,b) => a.subject.data.age > b.subject.data.age,
        },
        {
          title: 'Dirección',
          dataIndex: 'subject.data.address',
          sorter: (a,b) => a.subject.data.address > b.subject.data.address,
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
        this.props.fetchStudents();
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

    render() {
        const { students } = this.props;
        return (
            <GridContainer>
                <GridItem md={12}>
                    <Box title="Estudiantes" color="box-primary">
                        <div className="tableList">
                            <div className="tableListOperator">
                              <Link to="/rrhh/students/new">
                                  <Button icon = "plus"
                                          type = "primary"
                                  >
                                  Nuevo
                                  </Button>
                              </Link>  
                            </div>
                            <Table data={students.data} columns={this.columns} />
                            {/* <StandardTable
                                selectedRows={selectedRows}
                                //loading={loading}
                                data={students}
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
    students: state.student,
});
export default connect(mapStateToProps,{
    fetchStudents,
})(Students);