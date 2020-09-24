import React from 'react'

const fetchA = () => import(/* webpackChunkName: "componentA" */ "./ComponentA")
const fetchB = () => import(/* webpackChunkName: "componentB" */ "./ComponentB")

class Async extends React.Component{
    uninstall = false

    state = {
        Comp: null,
    }

    componentDidMount(){
        setTimeout(()=>{
            fetchA().then((comA)=>{
                console.log(this.uninstall)
                if(this.uninstall) return
                this.setState({
                    Comp:comA.default
                })
            })
        },3000)
        setTimeout(()=>{
            fetchB().then((comB)=>{
                if(this.uninstall) return
                this.setState({
                    Comp:comB.default
                })
            })
        },6000)
    }

    componentWillUnmount(){
        console.log("componentWillUnmount")
        this.uninstall = true
    }

    render(){
        const { Comp } = this.state;
        if(!Comp) return <div>loading ...</div>
        return <Comp />
    }
}

export default Async