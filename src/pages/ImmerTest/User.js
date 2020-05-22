import React from 'react';
import { connect } from '@/dva';

class User extends React.Component {
    constructor(){
        super()
    }

    componentWillReceiveProps(newProps){
        console.log(this.props.user === newProps.user )
    }

    render(){
        const { user } = this.props;
        const { name, age } = user;
        return (
            <div>
                <span>{name}: {age}</span>
                <button onClick={() => this.props.dispatch({ type: 'immerTest/modifyName' })}>modifyName</button>
                <button onClick={() => this.props.dispatch({ type: 'immerTest/modifyAge' })}>modifyAge</button>
            </div>
        )
    }
}

export default connect(({immerTest}) => ({
    user: immerTest.user
}))(User);