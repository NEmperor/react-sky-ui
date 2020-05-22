import React from 'react';
import { withRouter } from 'react-router-dom'
class ProxyLink extends React.Component {

  static defaultProps = {
    proxyable: false
  }

  constructor(props) {
    super();
    console.log(props)
  }

  push = () => {
    const { history, to } = this.props;
    history.push(to)
  }

  prompt = (callback) => {
    callback()
  }

  proxyPush = () => {
    const { proxyable, prompt } = this.props;
    const proxyPush = prompt || this.prompt;
    if(proxyable){
      proxyPush(this.push)
    }else{
      this.push()
    }
  }

  render() {
    const { children, to,prompt, proxyable, history, staticContext, ...otherProps } = this.props;
   
    const proxyPush = prompt || this.prompt;
    return (
      <a {...otherProps}
        onClick={() => this.proxyPush()}
      >
        {children}
      </a>
    )
  }
}

export default withRouter(ProxyLink)