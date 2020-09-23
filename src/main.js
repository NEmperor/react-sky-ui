import React from 'react'
import { withRouter } from 'react-router-dom'
import { Layout, Menu, Breadcrumb } from 'antd';
import 'antd/dist/antd.css'
import {
    DesktopOutlined,
    PieChartOutlined,
    FileOutlined,
    TeamOutlined,
    UserOutlined,
} from '@ant-design/icons';

import { Link } from './dva/router';
import {menu} from './router'
import { renderRoutes } from '@/router/react-router-config'
import Authorized from './pages/Authorized'
const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

class Main extends React.Component {
    state = {
        collapsed: false,
    };

    onCollapse = collapsed => {
        console.log(collapsed);
        this.setState({ collapsed });
    };

    renderMenuItem = (routes) => {
        return routes.map((route) => {
            if(route.routes){
                return (<SubMenu key={route.key} title={route.name}>{ this.renderMenuItem(route.routes)}</SubMenu>)
            }
            return  (<Menu.Item key={route.path} icon={<PieChartOutlined />}><Link to={route.path}>{route.name}</Link></Menu.Item>)
        })
    }

    render() {
        const { children, location, route } = this.props;
        return (
            <Layout style={{ minHeight: '100vh' }}>
                <Sider collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
                    <div className="logo" style={{ height: "100px" }} />
                    <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
                        {this.renderMenuItem(menu)}
                    </Menu>
                </Sider>
                <Layout className="site-layout">
                    <Header className="site-layout-background" style={{ padding: 0 }} />
                    <Content style={{ margin: '0 16px' }}>
                        <Breadcrumb style={{ margin: '16px 0' }}>
                            <Breadcrumb.Item>User</Breadcrumb.Item>
                            <Breadcrumb.Item>Bill</Breadcrumb.Item>
                        </Breadcrumb>
                        
                        {renderRoutes(route.routes,{app:window.__app})}
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
                </Layout>
            </Layout>
        );
    }
}


export default  Main