import { matchPath, Router, Switch, Route } from 'react-router';
import _extends from '@babel/runtime/helpers/esm/extends';
import React from 'react';
import dynamic from '@/dva/dynamic';

const noop = () => []

function matchRoutes(routes, pathname,
  /*not public API*/
  branch) {
  if (branch === void 0) {
    branch = [];
  }

  routes.some(function (route) {
    var match = route.path ? matchPath(pathname, route) : branch.length ? branch[branch.length - 1].match // use parent match
      : Router.computeRootMatch(pathname); // use default "root" match

    if (match) {
      branch.push({
        route: route,
        match: match
      });

      if (route.routes) {
        matchRoutes(route.routes, pathname, branch);
      }
    }

    return match;
  });
  return branch;
}

function renderRoutes(routes, extraProps, switchProps) {
  if (extraProps === void 0) {
    extraProps = {};
  }

  if (switchProps === void 0) {
    switchProps = {};
  }
  console.log(extraProps)
  return routes ? React.createElement(Switch, switchProps, routes.map(function (route, i) {
    const { models = noop, component } = route;
    console.log(route)
    const AsyncComponent = dynamic({
      app:extraProps.app,
      models,
      component
    });
    return React.createElement(Route, {
      key: route.key || i,
      path: route.path,
      exact: route.exact,
      strict: route.strict,
      render: function render(props) {
        return route.render ? route.render(_extends({}, props, {}, extraProps, {
          route: route
        })) : React.createElement(AsyncComponent, _extends({}, props, extraProps, {
          route: route
        }));
      }
    });
  })) : null;
}

export { matchRoutes, renderRoutes };
