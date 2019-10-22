import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import Lightbox from 'vue-easy-lightbox'
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(VueAxios, axios);
Vue.use(Lightbox)

Vue.config.productionTip = false;

new Vue({
  vuetify,
  render: h => h(App)
}).$mount('#app')
