import React, { Component } from 'react';
import { connect } from 'react-redux';
import logo from '../../../static/images/logo-icon.png';
import LoginForm from '../../components/Form/LoginForm';
import { login } from '../../actions/auth';

class LoginPage extends Component {

  componentDidMount() {
    if(this.props.isAutenticate)
    {
      this.props.history.push("/");
    }
  }
  
  handleSubmit = values =>{
    this.props.login(values);
    if(this.props.isAutenticate)
    {
      this.props.history.push("/");
    }
  }

  render() {
    return (
      <LoginForm onSubmit={this.handleSubmit} logo={logo} />
    );
  }
}
const mapStateToProps = state => ({
  isAutenticate: state.auth.isAutenticate,
})
export default connect(mapStateToProps,{
  login
})(LoginPage);