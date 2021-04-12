import { createWebHistory, createRouter } from 'vue-router';
import axios from 'axios';
import { API_URL } from '@/constants'

const router = createRouter({
    mode: 'history',
    history: createWebHistory(),
    routes: [
        {
            path: '/admin/',
            name: 'Home',
            meta: { auth: true, layout: "main"},
            component: () => import('../views/Home.vue')
        },
        {
            path: '/admin/login',
            name: 'sing-in',
            meta: { auth: false, layout: "empty"},
            component: () => import('../views/Login.vue')
        }
    ]
});

router.beforeEach(async (to, from, next) => {
    try {
        if (to.matched.some(record => record.meta.auth)) {
            const l = localStorage.getItem('token');
            let isValid = null;
            if(!!l) {
                isValid = await axios({ method: 'POST',  url:`${API_URL}admin/isValid/`, headers: { authorization: 'Bearer ' + l } });
            }

            if(!isValid?.data?.isValid) {
                next('/admin/login');
            }
        }
        next();
    } catch (e) {

    }
});

export default router;


