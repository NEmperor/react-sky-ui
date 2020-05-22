import React from 'react';
import { withRouter } from 'react-router-dom'
class Prompt extends React.Component {

  constructor(props) {
    super();
    console.log(props)
    this.method = props.history.block
  }

  componentDidMount() {
    this.release = this.method()
  }

  componentDidUpdate(prevProps) {
    if (prevProps.message !== this.props.message) {
      this.release();
      this.release = method(message);
    }
  }
  render() {
    const { when } = this.props
    if (!when || context.staticContext) return null;
    const { children, to, history, staticContext, ...otherProps } = this.props;
    return (
      <a {...otherProps}
        onClick={() => history.push(to)}
      >
        {children}
      </a>
    )
  }
}

export default withRouter(Prompt)