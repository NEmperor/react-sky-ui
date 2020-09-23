import React from 'react'
import { renderRoutes } from '@/router/react-router-config'

export default class PlaceHolde extends React.Component{

    render(){
        const { route } = this.props;
        console.log(route)
        return renderRoutes(route.routes,{app:window.__app})
        // return <div>PlaceHolde</div>
    }
} 
    
