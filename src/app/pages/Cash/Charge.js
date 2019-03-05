import React, { Component } from 'react';
import GridContainer from '../../components/Grid/GridContainer';
import GridItem from '../../components/Grid/GridItem';
import {
  Card,
} from 'antd';
import ChargeForm from '../../components/Form/ChargeForm';


class Charge extends Component {
    render() {
        return (
            <GridContainer>
                <GridItem md={12}>
                    <Card title="Cobros" className="card" bordered={false}>
                        <ChargeForm />
                    </Card>
                </GridItem>
            </GridContainer>
        );
    }
}

export default Charge;
