import  React  from 'react';
import { connect } from 'react-redux'
import { Router, Route, Link, routerRedux } from '@/dva/router';
import ProxyLink from '@/components/ProxyLink'
import styles from './style.less';

const { push } = routerRedux;

@connect()
class Home extends React.Component{

    async componentDidMount(){
        // console.log(aaa)
        const data = await Promise.resolve(1)
        console.log(data)
    }
    render(){

        console.log(process.env.NODE_ENV)
        
        const { dispatch } = this.props;
        return (<div className={styles.home}>
            <div className="header">Header</div>
            <ProxyLink to='/immerTest'>immerTest</ProxyLink>
            <button onClick={() => dispatch(push('/counter'))}>跳到/counter</button>
            <button onClick={() => abc()}>11</button>
            </div>) 
    }
}

export default Home