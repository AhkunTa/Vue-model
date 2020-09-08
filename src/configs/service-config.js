let appContext = window.base || `/${window.location.pathname.split('/')[1]}` 

let openApiContext = `${appContext}/api`

let apiList = [
  {
    name: 'testApi',
    method: 'get',
    baseURL: openApiContext,
    url: "/mock.json"
  }
]


export default {
  apiList,
  openApiContext,
  appContext,
}