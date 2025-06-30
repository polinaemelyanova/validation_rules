import { createRouter, createWebHistory } from 'vue-router'
import FormPage from '../../pages/FormPage.vue'
import ApiPage from '../../pages/ApiPage.vue'

const routes = [
    { path: '/form', component: FormPage },
    { path: '/api', component: ApiPage },
    { path: '/', redirect: '/form' }, // редирект с корня на форму
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router
