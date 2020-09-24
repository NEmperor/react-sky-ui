import React from 'react'
import { Layout, Menu, Breadcrumb } from 'antd';
import 'antd/dist/antd.css'
import { PieChartOutlined } from '@ant-design/icons';

import { Link } from '@/dva/router';
import {menu} from '@/router'
import { renderRoutes, matchRoutes } from '@/router/react-router-config'
import Authorized from '@/pages/Authorized'
import GlobalHeader from '@/components/GlobalHeader'
const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;


class BasicLayout extends React.Component {
    state = {
        collapsed: false,
        openKeys: [],
        selectedKeys:[]
    };

    
    componentDidMount(){
        this.freshMenu()
    }

    freshMenu = () => {
        const { location, route } = this.props;
        const routes = matchRoutes(route.routes, location.pathname);
        const routesPath = routes.map((item)=>item.route.path);
        if(routesPath.length === 0 ) return;
        const openKeys = routesPath.slice(0,routesPath.length)
        const selectedKeys = routesPath.slice(-1)
        this.setState({
            openKeys,
            selectedKeys
        })
    }

    onCollapse = collapsed => {
        this.setState({ collapsed });
    };

    changeSelectedKeys = (selectedKeys) => {
        this.setState({
            selectedKeys
        })
    }

    openChange = (openKeys) => {
        this.setState({
            openKeys
        })
    }

    renderMenuItem = (routes) => {
        return routes.map((route) => {
            if(route.routes){
                return (<SubMenu key={route.path} title={route.name}>{ this.renderMenuItem(route.routes)}</SubMenu>)
            }
            return  (<Menu.Item onClick={()=>this.changeSelectedKeys(route.path)} key={route.path} icon={<PieChartOutlined />}><Link to={route.path}>{route.name}</Link></Menu.Item>)
        })
    }

    render() {
        const { openKeys,selectedKeys } = this.state;
        const { location, route } = this.props;
        const routes = matchRoutes(route.routes, location.pathname);
        
        return (
            <Layout style={{ minHeight: '100vh' }}>
                <Sider collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
                    <div className="logo" style={{ height: "32px",backgroundColor:'#fff',margin:"16px",borderRadius:"6px" }} />
                    <Menu onOpenChange={this.openChange} theme="dark" selectedKeys={selectedKeys} openKeys={openKeys}   mode="inline">
                        {this.renderMenuItem(menu)}
                    </Menu>
                </Sider>
                <Layout className="site-layout">
                    <Header className="site-layout-background" style={{ padding: 0 }}>
                        <GlobalHeader />
                    </Header>
                    <Content style={{ margin: '0 16px' }}>
                        
                        <Breadcrumb style={{ margin: '16px 0' }}>
                            <Breadcrumb.Item key="/home"><Link to='/home'>首页</Link></Breadcrumb.Item>
                            {
                                routes.map((item)=>item.route).filter((route)=> route.name !== "首页").map((route)=><Breadcrumb.Item key={route.path}>{route.name}</Breadcrumb.Item>)
                            }
                        </Breadcrumb>
                        <Authorized route={route.routes} location={location}>
                            {renderRoutes(route.routes)}
                        </Authorized>
                        
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
                </Layout>
            </Layout>
        );
    }
}


export default  BasicLayout