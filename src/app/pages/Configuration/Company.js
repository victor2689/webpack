import React, { Component } from 'react';
import { connect } from 'react-redux';
import GridContainer from '../../components/Grid/GridContainer';
import GridItem from '../../components/Grid/GridItem';
import Box from '../../components/Box';
import CompanyForm from '../../components/Form/CompanyForm';
import { SUBJECT_TYPE_ENTERPRISE, IDENTITY_DOCUMENT_RUC, SEX_SAC, STATE_ACTIVO } from '../../Constants';
import SweetAlert from 'sweetalert-react';
import { insertEnterprise, updateEnterprise } from '../../actions/service';
import { fetchEnterprise } from '../../actions/enterprise';

class Company extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
        show: false
        };
    }
    componentDidMount() {
        if(Object.getOwnPropertyNames(this.props.enterprise).length === 0){
            this.props.fetchEnterprise();
        }
    }
    
    handleSubmit = values => {
        values.subjectType = SUBJECT_TYPE_ENTERPRISE;
        values.state = STATE_ACTIVO;
        values.sex = SEX_SAC;
        values.identityDocument= IDENTITY_DOCUMENT_RUC;
        if(!values.identifier){
            insertEnterprise(values).then(r => {
                this.props.fetchEnterprise();
            });
        }else{
            updateEnterprise(values).then(r => {
                this.props.fetchEnterprise();
            });
        }
    }
    
    handleOnSubmitSuccess = () => {
        this.setState({show:true});
    }
    reloadPage = () =>{
        
    }
    render() {
        const {enterprise} = this.props;
        return (
            <GridContainer>
                <GridItem md={12}>
                    <Box title="Empresa">
                        {
                        enterprise && 
                        <CompanyForm data={enterprise}
                            onSubmit={this.handleSubmit} 
                            onSubmitSuccess={this.handleOnSubmitSuccess}
                            onCancel={this.handleCancel}
                        ></CompanyForm>
                        }
                    </Box>
                </GridItem>
                <SweetAlert
                    show={this.state.show}
                    title="Correcto"
                    type="success"
                    html
                    text={"Los datos se guardaron con éxito."}
                    onConfirm={() => this.setState({show:false})}
                ></SweetAlert>
            </GridContainer>
            
        );
    }
}

const mapStateToProps = state => ({
    enterprise: state.enterprise
});
export default connect(mapStateToProps,{
    fetchEnterprise
})(Company);