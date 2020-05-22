# react router

## BrowserRouter 和 Router的关系
```js
import React from "react";
import { Router } from "react-router";
import { createBrowserHistory as createHistory } from "history";

class BrowserRouter extends React.Component {
  history = createHistory(this.props);

  render() {
    return <Router history={this.history} children={this.props.children} />;
  }
}
```

## HashRouter 和 Router的关系
```js
import React from "react";
import { Router } from "react-router";
import { createHashHistory as createHistory } from "history";

class HashRouter extends React.Component {
  history = createHistory(this.props);

  render() {
    return <Router history={this.history} children={this.props.children} />;
  }
}
```

## history
```js
import { createBrowserHistory } from 'history';

const history = createBrowserHistory();

// Get the current location.
const location = history.location;

// Listen for changes to the current location.
const unlisten = history.listen((location, action) => {
  // location is an object like window.location
  console.log(action, location.pathname, location.state);
});

// Use push, replace, and go to navigate around.
history.push('/home', { some: 'state' });

// To stop listening, call the function returned from listen().
unlisten();
```
The options that each create method takes, along with its default values, are:

```js
createBrowserHistory({
  basename: '', // The base URL of the app (see below)
  forceRefresh: false, // Set true to force full page refreshes
  keyLength: 6, // The length of location.key
  // A function to use to confirm navigation with the user (see below)
  getUserConfirmation: (message, callback) => callback(window.confirm(message))
});

createHashHistory({
  basename: '', // The base URL of the app (see below)
  hashType: 'slash', // The hash type to use (see below)
  // A function to use to confirm navigation with the user (see below)
  getUserConfirmation: (message, callback) => callback(window.confirm(message))
});

createMemoryHistory({
  initialEntries: ['/'], // The initial URLs in the history stack
  initialIndex: 0, // The starting index in the history stack
  keyLength: 6, // The length of location.key
  // A function to use to confirm navigation with the user. Required
  // if you return string prompts from transition hooks (see below)
  getUserConfirmation: null
});
```
### Using a Base URL
```js
const history = createHistory({
  basename: '/the/base'
});

history.listen(location => {
  console.log(location.pathname); // /home
});

history.push('/home'); // URL is now /the/base/home
```

###  histor的push
* globalHistory = window.hostory
```js
 const globalHistory = window.history;

 function push(path, state) {
    warning(
      !(
        typeof path === 'object' &&
        path.state !== undefined &&
        state !== undefined
      ),
      'You should avoid providing a 2nd state argument to push when the 1st ' +
        'argument is a location-like object that already has state; it is ignored'
    );

    const action = 'PUSH';
    const location = createLocation(path, state, createKey(), history.location);

    transitionManager.confirmTransitionTo(
      location,
      action,
      getUserConfirmation,
      ok => {
        if (!ok) return;

        const href = createHref(location);
        const { key, state } = location;

        if (canUseHistory) {
          globalHistory.pushState({ key, state }, null, href);

          if (forceRefresh) {
            window.location.href = href;
          } else {
            const prevIndex = allKeys.indexOf(history.location.key);
            const nextKeys = allKeys.slice(0, prevIndex + 1);

            nextKeys.push(location.key);
            allKeys = nextKeys;

            setState({ action, location });
          }
        } else {
          warning(
            state === undefined,
            'Browser history cannot push state in browsers that do not support HTML5 history'
          );

          window.location.href = href;
        }
      }
    );
  }

  function setState(nextState) {
    Object.assign(history, nextState);
    history.length = globalHistory.length;
    transitionManager.notifyListeners(history.location, history.action);
  }

```

### 在浏览器控制栏执行pushState函数，不能进行跳转，
* 如果用onpushstate和onpopstate监听pushState，来执行Router的setState刷新页面，在控制台执行pushState，就会刷新页面
* 但是Router组件使用的是history库自定义的listen函数，所以在浏览器控制栏执行pushState函数，不能进行跳转
* 如果用的是HashRouter，通过location.hash直接修改hash，可以进行页面刷新
```js
import React from "react";

import RouterContext from "./RouterContext";

/**
 * The public API for putting history on context.
 */
class Router extends React.Component {
  static computeRootMatch(pathname) {
    return { path: "/", url: "/", params: {}, isExact: pathname === "/" };
  }

  constructor(props) {
    super(props);

    this.state = {
      location: props.history.location
    };

    // This is a bit of a hack. We have to start listening for location
    // changes here in the constructor in case there are any <Redirect>s
    // on the initial render. If there are, they will replace/push when
    // they mount and since cDM fires in children before parents, we may
    // get a new location before the <Router> is mounted.
    this._isMounted = false;
    this._pendingLocation = null;

    if (!props.staticContext) {
      this.unlisten = props.history.listen(location => {
        if (this._isMounted) {
          this.setState({ location });
        } else {
          this._pendingLocation = location;
        }
      });
    }
  }

  componentDidMount() {
    this._isMounted = true;

    if (this._pendingLocation) {
      this.setState({ location: this._pendingLocation });
    }
  }

  componentWillUnmount() {
    if (this.unlisten) this.unlisten();
  }

  render() {
    return (
      <RouterContext.Provider
        children={this.props.children || null}
        value={{
          history: this.props.history,
          location: this.state.location,
          match: Router.computeRootMatch(this.state.location.pathname),
          staticContext: this.props.staticContext
        }}
      />
    );
  }
}

export default Router;
```
## ProxyLink
```js
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
```
### 如何使用 ProxyLink
* proxyable 值是true,功能开启
* push参数是跳转，根据条件来决定push的执行
```js
<ProxyLink
    proxyable
    prompt={(push)=>{
        if(true){console.log("push");push()}
    }} 
    to='/immerTest'
    >
        proxy link
</ProxyLink>
```

