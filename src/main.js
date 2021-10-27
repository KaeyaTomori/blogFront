import Vue from 'vue'
import ElementUI from 'element-ui'
import VueRouter from 'vue-router'
import "element-ui/lib/theme-chalk/index.css"
import 'element-ui/lib/theme-chalk/display.css'
import './assets/css/style.css'
import "./assets/css/typo.css";
import router from './router'
import store from './store'

Vue.use(ElementUI)
Vue.use(VueRouter)

import App from './App.vue'
import HeadBar from './components/HeadBar'
import FooterZone from './components/FooterZone'
import FriendsLink from './components/FriendsLink'
import ProfileCard from './components/ProfileCard'
import Categorys from './components/Categorys'
import Tags from './components/Tags'

Vue.config.productionTip = false


Vue.component("HeadBar",HeadBar)
Vue.component("FooterZone",FooterZone)
Vue.component("FriendsLink",FriendsLink)
Vue.component("ProfileCard",ProfileCard)
Vue.component("Categorys",Categorys)
Vue.component("Tags",Tags)

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')
