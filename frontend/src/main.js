import Vue from 'vue'
import app from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import * as VueGoogleMaps from 'vue2-google-maps'
import vClickOutside from 'v-click-outside'

var VueScrollTo = require('vue-scrollto');

Vue.use(VueScrollTo)
Vue.use(vClickOutside)


Vue.use(ElementUI);
Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyAQAMCiYL5QhL2ZQBGzkxE1t7P2soWUT7Y',
    libraries: 'places',
  },

})

Vue.config.productionTip = false

import './styles/styles.scss'

new Vue({
  router,
  store,
  render: h => h(app)
}).$mount('#app')
