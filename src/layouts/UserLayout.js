import React from 'react'
import { renderRoutes } from '@/router/react-router-config'

export default class UserLayout extends React.Component{

    render(){
        const { route } = this.props;
        return renderRoutes(route.routes,{app:window.__app})
    }
}