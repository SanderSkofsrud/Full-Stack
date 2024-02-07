import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import ContactForm from "@/components/ContactForm.vue";
import { createStore } from 'vuex';

// Mock global functions
global.fetch = vi.fn(() => Promise.resolve({
    json: () => Promise.resolve({ success: true })
}));
global.alert = vi.fn();

// Create a mock store
const createMockStore = () => {
    const state = {
        contact: {
            name: '',
            email: '',
            message: ''
        }
    };

    const mutations = {
        updateName: vi.fn(),
        updateEmail: vi.fn(),
        updateContact: vi.fn()
    };

    return createStore({
        state,
        mutations
    });
};

describe('ContactForm', () => {
    it('should enable submit button when form is valid', async () => {
        const store = createMockStore();
        const wrapper = mount(ContactForm, {
            global: {
                plugins: [store]
            }
        });
        await wrapper.find('#name').setValue('Jane Doe');
        await wrapper.find('#email').setValue('jane@example.com');
        await wrapper.find('#message').setValue('Hello');
        expect(wrapper.find('button[type="submit"]').element.disabled).toBe(false);
    });

    it('should show alert on successful form submission', async () => {
        const store = createMockStore();
        const wrapper = mount(ContactForm, {
            global: {
                plugins: [store]
            }
        });

        await wrapper.find('#name').setValue('Jane Doe');
        await wrapper.find('#email').setValue('jane@example.com');
        await wrapper.find('#message').setValue('Hello');
        await wrapper.find('form').trigger('submit.prevent');

        // Wait for all promises to resolve
        await wrapper.vm.$nextTick();

        // Check if the fetch was called
        expect(global.fetch).toHaveBeenCalled();

        // Check if the alert was called
        expect(global.alert).toHaveBeenCalledWith('Success');
    });

    it('should show error for invalid email format', async () => {
        const store = createMockStore();
        const wrapper = mount(ContactForm, {
            global: {
                plugins: [store]
            }
        });

        await wrapper.find('#name').setValue('John Doe');
        await wrapper.find('#email').setValue('invalid-email');
        await wrapper.find('#message').setValue('Hello');
        await wrapper.vm.$nextTick();

        expect(wrapper.vm.isFormInvalid).toBeTruthy();
    });

    it('should handle form submission failure', async () => {
        // Override the global fetch for this test
        global.fetch = vi.fn(() => Promise.reject(new Error('Network Error')));

        const store = createMockStore();
        const wrapper = mount(ContactForm, {
            global: {
                plugins: [store]
            }
        });

        await wrapper.find('#name').setValue('John Doe');
        await wrapper.find('#email').setValue('john@example.com');
        await wrapper.find('#message').setValue('Hello');
        await wrapper.find('form').trigger('submit.prevent');
        await wrapper.vm.$nextTick();

        expect(global.alert).toHaveBeenCalledWith('Network Error');

        // Reset the global fetch mock if needed
        global.fetch = vi.fn(() => Promise.resolve({
            json: () => Promise.resolve({ success: true })
        }));
    });

    it('should have the correct initial state', () => {
        const store = createMockStore();
        const wrapper = mount(ContactForm, {
            global: {
                plugins: [store]
            }
        });

        expect(wrapper.find('#name').element.value).toBe('');
        expect(wrapper.find('#email').element.value).toBe('');
        expect(wrapper.find('#message').element.value).toBe('');
    });

});
