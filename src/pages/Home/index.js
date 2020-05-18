import  React  from 'react';
import styles from './style.less';
import s from './a.css'

export default class Home extends React.Component{
    render(){
        return (<div className={styles.home}>
            <div className="header">Header</div>
            <div className={styles.title}>Home</div>
            </div>) 
    }
}