import React, { Component } from 'react';
import { Spin, Menu, Icon, Dropdown, Avatar } from 'antd';

import './index.scss';

export default class GlobalHeaderRight extends Component {

  render() {
    const {
      onMenuClick,
    } = this.props;
    const menu = (
      <Menu className="menu" selectedKeys={[]} onClick={onMenuClick}>
        <Menu.Item key="logout">
          <Icon type="logout" />
          Cerrar Sesión
        </Menu.Item>
      </Menu>
    );

    return (
      <div className='right'>
          <Dropdown overlay={menu}>
            <span className='action account'>
              <Avatar
                size="small"
                className="avatar"
                src="https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png"
                alt="avatar"
              />
              <span className="name">Victor</span>
            </span>
          </Dropdown>

      </div>
    );
  }
}
