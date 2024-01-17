import { createRouter, createWebHashHistory } from 'vue-router'
import Calculator from '../components/Calculator.vue'
import ContactForm from '../components/ContactForm.vue'

const routes = [
    {
        path: '/',
        name: 'calculator',
        component: Calculator
    },
    {
        path: '/contactForm',
        name: 'contactForm',
        component: ContactForm
    }
    // Future routes can be added here
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router