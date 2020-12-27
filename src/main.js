import Vue from 'vue'
import App from './App.vue'
import router from "./router"
import store from "./store"
import vuetify from './plugins/vuetify'
import "vuetify/dist/vuetify.css"
import VueMeta from 'vue-meta'

Vue.config.performance = true
Vue.config.productionTip = false
Vue.use(VueMeta, {
    // optional pluginOptions
    refreshOnceOnNavigation: true
})

new Vue({
    router,
    store,
    vuetify,
    render: h => h(App)
}).$mount('#app')
