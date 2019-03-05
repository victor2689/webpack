import React, { Component, Fragment } from 'react';
import GridContainer from '../../../components/Grid/GridContainer';
import GridItem from '../../../components/Grid/GridItem';

//import { Button } from 'antd';
import { Link } from 'react-router-dom';
import Table from '../../../components/Table';
import { connect } from 'react-redux';
import Box from '../../../components/Box';
import { fetchSeats, setMainSeat } from '../../../actions/seat';
import { Icon, Button, Fab, Tooltip } from '@material-ui/core';
import { Create, Repeat } from '@material-ui/icons';
import SweetAlert from 'sweetalert-react';


class Seats extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      show: false,
      identifier: ''
    };
  }
    columns = [
        {
          title: 'Nombre',
          dataIndex: 'name',
          sorter: (a,b) => a.name > b.name,
        },
        {
          title: 'Dirección',
          dataIndex: 'address',
          sorter: (a,b) => a.address > b.address,
        },
        {
          title: 'Teléfono',
          dataIndex: 'phone',
          sorter: (a,b) => a.phone > b.phone,
        },
        {
          title: 'Estado',
          dataIndex: 'main',
          render: value => value ? 'Principal': 'Sucursal',
        },
        {
          title: 'Acciones',
          render: (value, record) => (
            <Fragment>
              <Tooltip onClick={() => this.setState({show:true, identifier: record.identifier})} title="Seleccionar como principal">
                  <Fab size="small" color="primary" ><Repeat fontSize="small" /></Fab>
              </Tooltip>
              <Link to={`/configuration/seats/${record.identifier}/edit`}>
                <Tooltip title="Editar">
                  <Fab size="small" color="primary" ><Create fontSize="small" /></Fab>
                </Tooltip>
              </Link>
            </Fragment>
          ),
        },
    ];
    componentDidMount() {
      // if(this.props.seats === 0){
        this.props.fetchSeats();
      // }
    }
    setMainSeat = (id) => {
      this.props.setMainSeat(id).then(r =>{
        console.log('llego');
        this.props.fetchSeats();
      });
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
      const {  seats } = this.props;
        return (
          <GridContainer>
            <GridItem md={12}>
              <Box title="Sedes" color="box-primary">
                <div className="tableList">
                  <div className="tableListOperator">
                    <Link to="/configuration/seats/new" >
                        <Button variant="contained" size="small" color="primary">
                          Nuevo
                        </Button>
                    </Link>
                  </div>
                  <Table columns={this.columns} data={seats}></Table>
                </div>
              </Box>
              </GridItem>
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
          </GridContainer>
        );
    }
}

const mapStateToProps = state => ({
    seats: state.seat.data,
});
export default connect(mapStateToProps,{
    fetchSeats,
    setMainSeat
})(Seats);