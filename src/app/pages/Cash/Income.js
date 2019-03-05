import React, { Component } from 'react';
import GridContainer from '../../components/Grid/GridContainer';
import GridItem from '../../components/Grid/GridItem';
import {
  Card,
} from 'antd';
import IncomeForm from '../../components/Form/IncomeForm';


class Income extends Component {
    render() {
        return (
            <GridContainer>
                <GridItem md={12}>
                    <Card title="Ingresos" className="card" bordered={false}>
                        <IncomeForm />
                    </Card>
                </GridItem>
            </GridContainer>
        );
    }
}

export default Income;