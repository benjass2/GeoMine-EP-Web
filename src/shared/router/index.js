/**
* @summary Defines application navigation and child routes.
* @author Benjamin Solorzano
*/

import { createRouter, createWebHistory } from 'vue-router';

import Home from '../../inspections/presentation/views/home.vue';
import NewTelemetry from '../../inspections/presentation/views/new-telemetry.vue';
import PageNotFound from '../presentation/views/page-not-found.vue';

const routes = [
    {
        path: '/',
        redirect: '/home'
    },
    {
        path: '/home',
        name: 'home',
        component: Home
    },
    {
        path: '/telemetry',
        children: [
            {
                path: 'items/new',
                name: 'new-telemetry',
                component: NewTelemetry
            }
        ]
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'page-not-found',
        component: PageNotFound
    }
];

export default createRouter({
    history: createWebHistory(),
    routes
});