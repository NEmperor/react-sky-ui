import React from 'react'

const fetchA = () => import(/* webpackChunkName: "componentA" */ "./ComponentA")
const fetchB = () => import(/* webpackChunkName: "componentB" */ "./ComponentB")

class Async extends React.Component{

    state = {
        Comp: null
    }

    componentDidMount(){
        setTimeout(()=>{
            fetchA().then((comA)=>{
                console.log(comA)
                this.setState({
                    Comp:comA.default
                })
            })
        },3000)
        setTimeout(()=>{
            fetchB().then((comB)=>{
                console.log(comB)
                this.setState({
                    Comp:comB.default
                })
            })
        },6000)
    }

    render(){
        const { Comp } = this.state;
        if(!Comp) return <div>loading ...</div>
        return <Comp />
    }
}

export default Async