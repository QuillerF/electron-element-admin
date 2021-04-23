import adaptive from './adaptive'

const install = function(Vue) {
  Vue.directive('table-height', adaptive)
}

if (window.Vue) {
  window['table-height'] = adaptive
  Vue.use(install) // eslint-disable-line
}

adaptive.install = install
export default adaptive
