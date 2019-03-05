import React, { Component, Fragment } from 'react';
import { Icon } from 'antd';
import GlobalFooter from '../components/GlobalFooter';
import './UserLayout.scss';
import image from '../../static/images/login-register.jpg';

const copyright = (
  <Fragment>
    Copyright <Icon type="copyright" /> 2018 Web-Out S.A.
  </Fragment>
);

class UserLayout extends Component {
  render() {
    const { children } = this.props;
    return (
      <div className="login-register login-sidebar" style={{backgroundImage: `url(${image})`}}>
        <div className="login-box card">
          <div className="card-body">
            {children}
            <GlobalFooter copyright={copyright} />
          </div>
        </div>
      </div>
    );
  }
}

export default UserLayout;
