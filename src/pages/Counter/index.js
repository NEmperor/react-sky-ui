import  React  from 'react';
import { connect } from 'react-redux'

function Counter(props) {
    const { counter={} } = props
    return (
        <div>
            <p>{props.addLoading ? <span>执行中</span> : counter.number}</p>
            <button onClick={() => props.dispatch({ type: "counter/add" })}>加1</button>
            <button disabled={props.loading} onClick={() => props.dispatch({ type: "counter/asyncAdd" })}>异步+</button>
        </div>
    )
}

export default connect(({counter,loading})=>({
    counter,
    addLoading: loading.models.counter
}))(Counter)