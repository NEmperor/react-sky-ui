import React from 'react';
import {matchRoutes} from '../router/react-router-config'
import uniq from 'lodash/uniq';


export default ({ children, route, location }) => {
    
  const routes = matchRoutes(route, location.pathname);
  console.log(routes, location.pathname)
  let authorities = [];
  routes.forEach(item => {
    if (Array.isArray(item.route.authority)) {
      authorities = authorities.concat(item.route.authority);
    } else if (typeof item.route.authority === 'string') {
      authorities.push(item.route.authority);
    }
  });
  const noMatch = (<div>403</div>);
  return (
    <Authorized
      authority={authorities.length === 0 ? undefined : uniq(authorities)}
      noMatch={noMatch}
    >
      {children}
    </Authorized>
  );
};


const Authorized = ({authority,children, noMatch}) => {
    console.log(authority,children)
    const currentAuthority = "user"

    if (!authority) {
        return children;
      }

      if (Array.isArray(authority)) {
        if (authority.indexOf(currentAuthority) >= 0) {
          return children;
        }
        return noMatch;
      }
}
