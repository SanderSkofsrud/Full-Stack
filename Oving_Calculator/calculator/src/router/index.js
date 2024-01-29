import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '@/components/HomePage.vue';
import SimpleCalculator from '@/components/Calculator.vue';
import ContactForm from '@/components/ContactForm.vue';

const routes = [
    {path: '/', component: HomePage},
    {path: '/calculator', component: SimpleCalculator},
    {path: '/contactForm', component: ContactForm}
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;
