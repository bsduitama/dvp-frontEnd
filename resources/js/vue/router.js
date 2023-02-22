import { createRouter, createWebHistory } from "vue-router";

import Users from './components/findUser.vue'
import User from './components/user.vue'

const Home = { template: '<div>Home</div>' }

const routesInfo = [
    {
        path: '/',
        name: 'users',
        component: Users,
    },
    {
        path: '/:login',
        name: 'user',
        component: User,
        props: true,
    },
];

export const router = createRouter({
    history : createWebHistory(),
    routes : routesInfo,
});
export default router;
