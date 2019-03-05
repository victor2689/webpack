import React, { Component, Suspense } from 'react';
import { Layout } from 'antd';
import DocumentTitle from 'react-document-title';
import { connect } from 'react-redux';
import { ContainerQuery } from 'react-container-query';
import classNames from 'classnames';
import pathToRegexp from 'path-to-regexp';
import Media from 'react-media';
import logo from '../../static/images/logo-icon.png';
import Footer from './Footer';
import Header from './Header';
import Context from './MenuContext';
import SiderMenu from '../components/SiderMenu';
import { fetchMenuData } from '../actions/menu';
import { changeLayoutCollapsed } from '../actions/global';
import { getMenuData, getBreadcrumbNameMap } from '../selectors/menu';
import { getCollapsedLayout } from '../selectors/global';
import PageLoading from '../components/PageLoading';
import menuData from '../_nav';
import { fetchUbigeo } from '../actions/ubigeo';
import './BasicLayout.scss';

const { Content } = Layout;

const query = {
  'screen-xs': {
    maxWidth: 575,
  },
  'screen-sm': {
    minWidth: 576,
    maxWidth: 767,
  },
  'screen-md': {
    minWidth: 768,
    maxWidth: 991,
  },
  'screen-lg': {
    minWidth: 992,
    maxWidth: 1199,
  },
  'screen-xl': {
    minWidth: 1200,
    maxWidth: 1599,
  },
  'screen-xxl': {
    minWidth: 1600,
  },
};

class BasicLayout extends Component {

  componentDidMount() {
    //const { route: { routes } } = this.props
    this.props.fetchMenuData(menuData);
    if(this.props.ubigeo.length === 0){
      this.props.fetchUbigeo();
    }
  }

  getContext() {
    const { location, breadcrumbNameMap } = this.props;
    return {
      location,
      breadcrumbNameMap,
    };
  }

  matchParamsPath = (pathname, breadcrumbNameMap) => {
    const pathKey = Object.keys(breadcrumbNameMap).find(key => pathToRegexp(key).test(pathname));
    return breadcrumbNameMap[pathKey];
  };

  getPageTitle = (pathname, breadcrumbNameMap) => {
    const currRouterData = this.matchParamsPath(pathname, breadcrumbNameMap);

    if (!currRouterData) {
      return 'Total Soft';
    }

    return `${currRouterData.name} - Total Soft`;
  };

  getLayoutStyle = () => {
    const { isMobile, collapsed } = this.props;
    if (!isMobile) {
      return {
        paddingLeft: collapsed ? '80px' : '256px',
      };
    }
    return null;
  };

  getContentStyle = () => {
    return {
      margin: '24px 24px 0',
      paddingTop: 64,
    };
  };

  handleMenuCollapse = collapsed => {
    this.props.changeLayoutCollapsed(collapsed);
  };

  render() {
    const {
      children,
      location: { pathname },
      isMobile,
      menuData,
      breadcrumbNameMap,
    } = this.props;
    const layout = (
      <Layout>
        <SiderMenu
          logo={logo}
          theme='dark'
          onCollapse={this.handleMenuCollapse}
          menuData={menuData}
          isMobile={isMobile}
          {...this.props}
        />
        <Layout
          style={{
            ...this.getLayoutStyle(),
            minHeight: '100vh',
          }}
        >
          <Header
            menuData={menuData}
            handleMenuCollapse={this.handleMenuCollapse}
            logo={logo}
            isMobile={isMobile}
            {...this.props}
          />
          <Content style={this.getContentStyle()}>
            <Suspense fallback={PageLoading}>
              {children}
            </Suspense>
          </Content>
          <Footer />
        </Layout>
      </Layout>
    );
    return (
      <React.Fragment>
        <DocumentTitle title={this.getPageTitle(pathname, breadcrumbNameMap)}>
          <ContainerQuery query={query}>
            {params => (
              <Context.Provider value={this.getContext()}>
                <div className={classNames(params)}>{layout}</div>
              </Context.Provider>
            )}
          </ContainerQuery>  
        </DocumentTitle>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state =>({
  collapsed: getCollapsedLayout(state),
  menuData: getMenuData(state),
  breadcrumbNameMap: getBreadcrumbNameMap(state),
  ubigeo: state.ubigeo.data
});
export default connect(mapStateToProps,{
  fetchMenuData,
  changeLayoutCollapsed,
  fetchUbigeo
})(props => (
  <Media query="(max-width: 599px)">
    {isMobile => <BasicLayout {...props} isMobile={isMobile} />}
  </Media>
));
