import React, { Component } from 'react';
import GridContainer from '../../../components/Grid/GridContainer';
import GridItem from '../../../components/Grid/GridItem';
import { Link } from 'react-router-dom';
import { Button } from 'antd';
import { connect } from 'react-redux';

import Table from '../../../components/Table';
import Box from '../../../components/Box';
import { fetchMothers } from '../../../actions/mother';

class Mothers extends Component {
    state = {
        modalVisible: false,
        selectedRows: [],
    };
    columns = [{
            title: 'Dni',
            dataIndex: 'identityNumber',
            sorter: (a, b) => a.identityNumber > b.identityNumber,
        },
        {
            title: 'Nombres y Apellidos',
            dataIndex: 'subject.data.fullName',
            sorter: (a, b) => a.subject.data.fullName > b.subject.data.fullName,
        },
        {
            title: 'Teléfono',
            dataIndex: 'subject.data.phone',
            sorter: (a, b) => a.subject.data.phone > b.subject.data.phone,
        },
        {
            title: 'Edad',
            dataIndex: 'subject.data.age',
            sorter: (a, b) => a.subject.data.age > b.subject.data.age,
        },
        {
            title: 'Dirección',
            dataIndex: 'subject.data.address',
            sorter: (a, b) => a.subject.data.address > b.subject.data.address,
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
        this.props.fetchMothers();
    }

    handleStandardTableChange = (pagination, filtersArg, sorter) => {
        const filters = Object.keys(filtersArg).reduce((obj, key) => {
            const newObj = {...obj };
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
        const { mothers } = this.props;
        const { selectedRows, modalVisible } = this.state;
        //console.log(fathers);
        return ( <GridContainer>
                    <GridItem md={12}>
                        <Box title="Madres"
                                color="box-primary"
                        >
                            <div className = "tableList" >
                                <div className = "tableListOperator" >
                                    <Link to="/rrhh/mothers/new">
                                        <Button icon = "plus"
                                                type = "primary"
                                        >
                                        Nuevo
                                        </Button>
                                    </Link>                                    
                                </div>
                                <Table data={mothers.data} columns={this.columns} />
                                {/* <StandardTable selectedRows = { selectedRows }
                                                //loading={loading}
                                                data = { fathers }
                                                columns = { this.columns }
                                                onSelectRow = { this.handleSelectRows }
                                                onChange = { this.handleStandardTableChange }
                                />  */}
                            </div> 
                        </Box>
                    </GridItem>
                </GridContainer>
        );
    }
}
const mapStateToProps = state => ({
    mothers: state.mother,
});
export default connect(mapStateToProps,{
    fetchMothers
})(Mothers);