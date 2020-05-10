import React from 'react';
import Loadable from 'react-loadable';

const LazyLoad = loader => Loadable({
    loader,
    loading() {
      return <div>Loading...</div>
    }
  })

  export default LazyLoad