import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import element from 'element-ui';
import locale from 'element-ui/lib/locale/lang/en';
import VueSocialSharing from 'vue-social-sharing';
import * as VueGoogleMaps from 'vue2-google-maps';
import '@fortawesome/fontawesome-free/css/all.css';
import '@fortawesome/fontawesome-free/js/all.js';

import '@/styles/styles.scss';

Vue.use(VueSocialSharing);

Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyC1IyV2W9PZTl0fv2-1SUzT6Kz6X9LC1do',
    // key: 'AIzaSyB0b3on9pGxutkQG8-bRNmspW4imoC7_OI',
    libraries: 'places',
    
  },
});

Vue.use(element, {locale})
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')