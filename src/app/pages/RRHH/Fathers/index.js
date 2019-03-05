import React, { Component } from 'react';
import GridContainer from '../../../components/Grid/GridContainer';
import GridItem from '../../../components/Grid/GridItem';
import { Link } from 'react-router-dom';
import { Button } from 'antd';
//import StandardTable from '../../../../components/StandardTable';
import { connect } from 'react-redux';

//import { setPagination } from '../../actions/global';
import Table from '../../../components/Table';
import Box from '../../../components/Box';
import { fetchFathers } from '../../../actions/father';

//import 'moment/locale/es';
//import moment from 'moment';

class Fathers extends Component {

    columns = [{
            title: 'Dni',
            dataIndex: 'identityNumber',
            sorter: (a, b) => a.identityNumber > b.identityNumber,
        },
        {
            title: 'Nombres y Apellidos',
            dataIndex: 'subject.data.fullName',
            sorter: (a, b) => a.subject.data.fullName > b.fullName,
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
        this.props.fetchFathers();
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



    render() {
        const { fathers } = this.props;
        //console.log(fathers);
        return ( <GridContainer>
                    <GridItem md={12}>
                        <Box title="Padres"
                                color="box-primary"
                        >
                            <div className = "tableList" >
                                <div className = "tableListOperator" >
                                    <Link to="/rrhh/fathers/new">
                                        <Button icon = "plus"
                                                type = "primary"
                                        >
                                        Nuevo
                                        </Button>
                                    </Link>                                    
                                </div>
                                <Table data={fathers.data} columns={this.columns} />
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
    fathers: state.father,
});
export default connect(mapStateToProps,{
    fetchFathers
})(Fathers);