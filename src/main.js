import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import * as constants from '../constants'
// import AOS from 'aos'
// import 'aos/dist/aos.css'

axios.defaults.baseURL = constants.API_URL;



const app = createApp(App)
app.use(router)
// AOS.init()
app.mount('#app')
