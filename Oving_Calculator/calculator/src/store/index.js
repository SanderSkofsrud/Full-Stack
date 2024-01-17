import { createStore } from 'vuex';

export default createStore({
    state: {
        contact: {
            name: '',
            email: ''
        }
    },
    mutations: {
        updateContact(state, contact) {
            state.contact.name = contact.name;
            state.contact.email = contact.email;
        }
    },
    actions: {},
    modules: {}
});
