import React from 'react';
import { HashRouter,Switch, Route, Link } from "react-router-dom";
import router from './router'
import Timer from './components/Timer'

interface Iprops {
    name?: string;
}
interface Istate {
    timeSwitch: boolean;
}

export default class App extends React.Component<Iprops, Istate> {

    state={
        timeSwitch: false
    }

    handleTimer = () => {
        this.setState({
            timeSwitch: !this.state.timeSwitch
        })
    }

    renderLink = () => {
        return router.map((item)=> <Link key={item.key} to={item.path}> {item.name} </Link>)
    }

    renderRoute = () => {
        return router.map((route)=> {
            const component = require(`./pages/${route.component}/index.js`).default;
            return <Route key={route.key} exact path={route.path} component={component} />
        } )
    }

    render(){
        const { timeSwitch } = this.state;
        return (
            <HashRouter>
                <div style={{display: 'flex',height:'100vh',}}>
                  <div style={{flexBasis:"200px",overflow:'auto',backgroundColor:'pink'}}>
                    {this.renderLink()}
                  </div>
                  <div style={{flex:'1'}}>
                    <Switch>
                        {this.renderRoute()}
                    </Switch> 
                    <Timer timeSwitch={timeSwitch} />
                    <button onClick={()=>this.handleTimer()}>开启/关闭</button>
                  </div>  
                </div>
                
            </HashRouter>
        )
    }
}