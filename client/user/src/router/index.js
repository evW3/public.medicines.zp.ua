import { createWebHistory, createRouter } from 'vue-router';
import Home from '../views/Home.vue'

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    }
];

export const router = createRouter({
    mode: 'history',
    history: createWebHistory(),
    routes,
});


