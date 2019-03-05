import React, { Component } from 'react';
import GridContainer from '../../components/Grid/GridContainer';
import GridItem from '../../components/Grid/GridItem';
import {
  Card,
} from 'antd';
import SalarieForm from '../../components/Form/SalarieForm';

class Salaries extends Component {
    render() {
        return (
            <GridContainer>
                <GridItem md={12}>
                    <Card title="Sueldos" className="card" bordered={false}>
                        <SalarieForm />
                    </Card>
                </GridItem>
            </GridContainer>
        );
    }
}

export default Salaries;

