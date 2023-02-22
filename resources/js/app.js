import './bootstrap';

import {createApp} from 'vue'

import App from './vue/App.vue'

// import Users from './vue/components/findUser.vue'
// import User from './vue/components/user.vue'
import router from "./vue/router.js";



const app = createApp(App)
app.use(router)
// app.component([
//     Users,
//     User
// ])
app.mount("#app")
// createApp(App).mount("#app")
