import React, { Component } from 'react';
import GridContainer from '../../../components/Grid/GridContainer';
import GridItem from '../../../components/Grid/GridItem';
import { Link } from 'react-router-dom';
import { Button } from 'antd';
import { connect } from 'react-redux';

import Table from '../../../components/Table';
import Box from '../../../components/Box';
import { fetchParents } from '../../../actions/parent';

class Parents extends Component {
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

    ];
    componentDidMount() {
        this.props.fetchParents();
    }

    render() {
        const { parents } = this.props;

        return ( <GridContainer>
                    <GridItem md={12}>
                        <Box title="Apoderados" color="box-primary" >
                            <div className = "tableList" >
                                <div className = "tableListOperator" >
                                    <Link to="/rrhh/parents/new">
                                        <Button icon = "plus"
                                                type = "primary"
                                        >
                                        Nuevo
                                        </Button>
                                    </Link>                                    
                                </div>
                                <Table data={parents.data} columns={this.columns} />
                            </div> 
                        </Box>
                    </GridItem>
                </GridContainer>
        );
    }
}
const mapStateToProps = state => ({
    parents: state.parent,
});
export default connect(mapStateToProps,{
    fetchParents
})(Parents);
