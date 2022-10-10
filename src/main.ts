import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import "./assets/css/nucleo-icons.css";
import "./assets/css/nucleo-svg.css";

// @ts-ignore
import ArgonDashboard from "./argon-dashboard";


createApp(App)
    .use(store)
    .use(router)
    .use(ArgonDashboard)
    .mount('#app');
