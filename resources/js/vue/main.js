import { createApp } from "vue";
import axios from "axios";
import '../css/app.css';
import { createRouter, createWebHistory } from "vue-router";


// import router from './router'
import App from "./App.vue"


import Users from './components/findUser'
import User from './components/user.vue'
import router from "./router";



const app = createApp(App)
app.use(router)
app.component([
    Users,
    User
])

app.config.prototype.$axios = axios

window.axios = axios

app.mount("#app")
