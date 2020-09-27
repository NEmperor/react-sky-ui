import React from 'react'
import { renderRoutes } from '@/router/react-router-config'

export default class UserLayout extends React.Component {

    render() {
        const { route } = this.props;
        return (
            <div style={{height:"100vh",backgroundColor:"#000f37"}}>
                {renderRoutes(route.routes)}
            </div>
        )
    }
}