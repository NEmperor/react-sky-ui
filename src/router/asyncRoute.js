import dynamic from '@/dva/dynamic'
const noop = () => [];

const AsyncRouteOne = dynamic({
    models:noop,
    component: () => import(/* webpackChunkName: "AsyncRouteOne" */"../pages/AsyncRouteOne")
  })

export default { AsyncRouteOne }