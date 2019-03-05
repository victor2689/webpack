import React, { Component } from 'react';
import GridContainer from '../../components/Grid/GridContainer';
import GridItem from '../../components/Grid/GridItem';
import {
  Card,
  Button,
  Table
} from 'antd';

import { connect } from 'react-redux';
import PayoutForm from '../../components/Form/PayoutForm';

class Payout extends Component {
    render() {
        return (
            <GridContainer>
                <GridItem md={12}>
                    <Card title="pagos" className="card" bordered={false}>
                        <PayoutForm></PayoutForm>
                    </Card>
                </GridItem>
            </GridContainer>
        );
    }
}

export default Payout;