import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import IonIcon from '@/components/ionIcon/IonIcon'

import JsonExcel from 'vue-json-excel'
Vue.component('downloadExcel', JsonExcel);

import {ColorPicker, ColorPanel} from 'one-colorpicker'

Vue.use(ColorPanel)
Vue.use(ColorPicker)

Vue.component('ion-icon', IonIcon)
Vue.config.ignoredElements = [/^ion-/];

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
