import Vue from 'vue'
import App from './App.vue'

import VueResource from 'vue-resource'
import router from './router/index.js'
import VueLazyLoad from 'vue-lazyload'
import store from './store/index'
import './common/stylus/index.styl'


Vue.config.productionTip = false
Vue.use(VueResource);
Vue.use(VueLazyLoad,{
  loading:require('@/common/image/default.png')
})
new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
