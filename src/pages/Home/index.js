import  React  from 'react';
import ProxyLink from '@/components/ProxyLink'
import styles from './style.less';

export default class Home extends React.Component{

    async componentDidMount(){
        console.log(123)
        const data = await Promise.resolve(1)
        console.log(data)
    }
    render(){
        return (<div className={styles.home}>
            <div className="header">Header</div>
            <ProxyLink to='/immerTest'>immerTest</ProxyLink>
            </div>) 
    }
}