import  React  from 'react';
import { connect } from 'react-redux'
import ProxyLink from '@/components/ProxyLink'
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
        console.log(this.props)
    }

    jump = () => {
        this.history.push("/counter")
    }

    skip = () => {
        console.log(__RouterContext);
        
    }
    render(){

        console.log(process.env.NODE_ENV)
        
        const { dispatch } = this.props;
        return (<div className={styles.home}>
            <div className="header">Header</div>
            <button onClick={this.jump}>跳到/counter</button>
            <button onClick={this.skip}>test2</button>
            </div>) 
    }
}

export default Home