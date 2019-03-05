import React, { Component } from 'react';
import GridContainer from '../../components/Grid/GridContainer';
import GridItem from '../../components/Grid/GridItem';
import { Card } from 'antd';
import EnrollmentForm from '../../components/Form/EnrollmentForm';

class Enrollment extends Component {
    render() {
        return (
            <GridContainer>
                <GridItem md={12}>
                    <Card title="Matricula" className="card" bordered={false}>
                        <EnrollmentForm></EnrollmentForm>
                    </Card>
                </GridItem>
            </GridContainer>
        );
    }
}

export default Enrollment;