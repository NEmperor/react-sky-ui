import  React  from 'react';
import { connect } from 'react-redux'
import styles from './style.less';

@connect()
class Home extends React.Component{

    constructor(props){
        super();
        this.history = props.history
    }

    async componentDidMount(){

        const data = await Promise.resolve(1)
        console.log(data)
    }

    jump = () => {
        this.history.push("/counter")
    }

    render(){

        console.log(process.env.NODE_ENV)
        
        return (<div className={styles.home}>
            <div className="header">Header</div>
            <button onClick={this.jump}>跳到/counter</button>
            </div>) 
    }
}

export default Home