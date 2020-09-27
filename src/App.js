import React from 'react';
import { Router } from 'react-router'
import { connect } from 'react-redux'
import history from '@/router/history'
import router from '@/router'
import {  renderRoutesDeep } from '@/router/react-router-config'


@connect(({asyncMenu})=>({asyncRouter:asyncMenu.asyncRouter}))
class App extends React.Component {

    componentDidMount(){
        const { dispatch } = this.props;
        setTimeout(()=>{
            dispatch({
                type: 'asyncMenu/saveMenu'
            })
        },2000)
        
    }
    
    render(){
        const { asyncRouter } = this.props;
        const notFount = router[1].routes.pop();
        router[1].routes.push(...asyncRouter)
        router[1].routes.push(notFount)
        
        return (
            <Router history={history}>
                {renderRoutesDeep(router)}
            </Router>
            
        )
    }
}

export default App