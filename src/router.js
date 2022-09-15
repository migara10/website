import { createRouter, createWebHistory } from "vue-router";
/* import LoginPage from './views/LoginPage' */
import Home from './components/views/HomePage.vue'
import News from './components/views/NewsList.vue'


const routes = [
    {
        path: '/',
        name: 'home',
        component: Home
    },
    {
        path: '/news/:id/:value',
        name: 'news',
        component: News
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
    linkActiveClass: 'active'
    // linkExactActiveClass: 'active'
})

export default router