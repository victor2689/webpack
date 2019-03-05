import React, { Component, Fragment } from 'react';
import GridContainer from '../../components/Grid/GridContainer';
import GridItem from '../../components/Grid/GridItem';
import {
  Card,
  Button,
  Table
} from 'antd';

import { DiscountsData } from '../../Constants/DiscountsData';
import { connect } from 'react-redux';
import RegularButton from '../../components/CustomButtons/Button';
import { Dialog, DialogContent } from '@material-ui/core';
import DiscountForm from '../../components/Form/DiscountForm';
import { fetchDiscounts } from '../../actions/discount';

class Discounts extends Component {
    state = {
        modalVisible: false,
        selectedRows: [],
    };
    columns = [
        {
          title: 'Tipo',
          dataIndex: 'type',
        },
        {
          title: 'Nombre',
          dataIndex: 'name',
        },
        {
          title: 'Monto',
          dataIndex: 'amount',
        },
        {
          title: 'Descripción',
          dataIndex: 'description',
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
        this.props.fetchDiscounts(DiscountsData);
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
        const { discounts } = this.props;
        const { modalVisible } = this.state;
        return (
            <GridContainer>
                <GridItem md={12}>
                    <Card title="Descurntos" className="card" bordered={false}>
                        <div className="tableList">
                            <div className="tableListOperator">
                            <Button icon="plus" type="primary" onClick={() => this.handleModalVisible(true)}>
                                Nuevo
                            </Button>
                            </div>
                            <Table
                            dataSource={discounts.data}
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
                            <DiscountForm onSubmit={this.handleSubmit}></DiscountForm>
                        </DialogContent>
                    </Dialog>
                </GridItem>
            </GridContainer>
        );
    }
}
const mapStateToPros = state => ({
    discounts: state.discount
})
export default connect(mapStateToPros,{
    fetchDiscounts
})(Discounts);