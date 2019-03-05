import React, { Component, Fragment } from 'react';
import GridContainer from '../../../components/Grid/GridContainer';
import GridItem from '../../../components/Grid/GridItem';
import { Link } from 'react-router-dom';
import { Table } from 'antd';
import { connect } from 'react-redux';
import { Delete } from '@material-ui/icons';
import Box from '../../../components/Box';
import { Button } from '@material-ui/core';
import { fetchConcepts } from '../../../actions/product';
import SweetAlert from 'sweetalert-react';

class Concepts extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
          show: false,
          identifier: ''
        };
      }
    columns = [
        {
          title: 'Concepto',
          dataIndex: 'name',
        },
        {
          title: 'Costo',
          dataIndex: 'price',
        },
        {
          title: 'Acciones',
          render: (text, record) => (
            <Fragment>
                <Link to={`/administration/concepts/${record.identifier}/edit`}>
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
        this.props.fetchConcepts();
    }
    
    render() {
        const { concepts } = this.props;
        return (
            <GridContainer>
                <GridItem md={12}>
                    <Box title="Conceptos" color="box-primary">
                        <div className="tableList">
                            <div className="tableListOperator">
                            <Link to="/administration/concepts/new">
                                <Button variant="contained" size="small" color="primary">
                                    Nuevo
                                </Button>
                            </Link>
                            </div>
                            <Table
                            data={concepts}
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
                        onConfirm={() => {
                        this.setState({show:false})
                        this.setMainSeat(this.state.identifier);
                        }}
                    ></SweetAlert>
                </GridItem>
            </GridContainer>
        );
    }
}

const mapStateToPros = state => ({
    concepts: state.concept.data
})

export default connect(mapStateToPros,{
    fetchConcepts
})(Concepts);





