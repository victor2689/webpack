import React, { Component, Fragment } from 'react';
import GridContainer from '../../components/Grid/GridContainer';
import GridItem from '../../components/Grid/GridItem';
import {
  Card,
  Button,
  Table
} from 'antd';

import { MonthlyPaymentData } from '../../Constants/MonthlyPaymentData';
import { connect } from 'react-redux';
import RegularButton from '../../components/CustomButtons/Button';
import { Dialog, DialogContent } from '@material-ui/core';
import MonthlyPaymentForm from '../../components/Form/MonthlyPaymentForm';
import { fetchMonthlyPayments } from '../../actions/monthlyPayment';

class MonthlyPayment extends Component {
    state = {
        modalVisible: false,
        selectedRows: [],
    };
    columns = [
        {
          title: 'Concepto',
          dataIndex: 'concept',
        },
        {
          title: 'Nivel',
          dataIndex: 'level',
        },
        {
          title: 'Fecha Inicio',
          dataIndex: 'initdate',
        },
        {
          title: 'Fecha Final',
          dataIndex: 'enddate',
        },
        {
            title: 'Monto',
            dataIndex: 'amount',
        },
        {
            title: 'Monto extra',
            dataIndex: 'amountextra',
        },
        {
          title: 'Editar',
          render: (text, record) => (
            <Fragment>
                <RegularButton color="info" >+</RegularButton>
            </Fragment>
          ),
        },
        {
            title: 'Eliminar',
            render: (text, record) => (
              <Fragment>
                <RegularButton color="danger" >-</RegularButton>
              </Fragment>
            ),
          },
    ];
    componentDidMount() {
        this.props.fetchMonthlyPayments(MonthlyPaymentData);
    }
    
    handleStandardTableChange = (pagination, filtersArg, sorter) => {
        // const filters = Object.keys(filtersArg).reduce((obj, key) => {
        //   const newObj = { ...obj };
        //   newObj[key] = getValue(filtersArg[key]);
        //   return newObj;
        // }, {});
    
        // const params = {
        //   currentPage: pagination.current,
        //   pageSize: pagination.pageSize,
        //   ...filters,
        // };
        // if (sorter.field) {
        //   params.sorter = `${sorter.field}_${sorter.order}`;
        // }
        // this.props.setPagination(params);
    };
    handleModalVisible = flag => {
        this.setState({
            modalVisible: !!flag,
        });
    };
     handleSubmit = value => {

    }
    handleSelectRows = rows => {
        this.setState({
          selectedRows: rows,
        });
    };

    render() {
        const { monthlyPayment } = this.props;
        const { modalVisible } = this.state;
        return (
            <GridContainer>
                <GridItem md={12}>
                    <Card title="Pesiones" className="card" bordered={false}>
                        <div className="tableList">
                            <div className="tableListOperator">
                            <Button icon="plus" type="primary" onClick={() => this.handleModalVisible(true)}>
                                Nuevo
                            </Button>
                            </div>
                            <Table
                            dataSource={monthlyPayment.data}
                            columns={this.columns}
                            onChange={this.handleStandardTableChange}
                            />
                        </div>
                    </Card>
                    <Dialog 
                        open={modalVisible}
                        onClose={() => this.handleModalVisible(false)}
                        aria-labelledby="form-dialog-title"
                    >
                        <DialogContent>
                            <MonthlyPaymentForm onSubmit={this.handleSubmit}></MonthlyPaymentForm>
                        </DialogContent>
                    </Dialog>
                </GridItem>
            </GridContainer>
        );
    }
}

const mapStateToPros = state => ({
    monthlyPayment: state.monthlyPayment
})
export default connect(mapStateToPros,{
    fetchMonthlyPayments
})(MonthlyPayment);