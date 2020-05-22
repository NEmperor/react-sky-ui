import React from 'react';
import { Prompt } from 'react-router-dom'
import { connect } from '@/dva';
import User from './User'

function ImmerTest(props) {
    const { num } = props;
    console.log(num)
    return (
        <>
            <button onClick={() => props.dispatch({ type: 'immerTest/asyncAdd' })}>add</button>
            <div>{num}</div>
            <User />
            {/* <Prompt
                when={true}
                 message="Are you sure you want to leave?"
            /> */}
        </>
    )
}

export default connect(({immerTest})=>({
    num: immerTest.num
}))(ImmerTest);
