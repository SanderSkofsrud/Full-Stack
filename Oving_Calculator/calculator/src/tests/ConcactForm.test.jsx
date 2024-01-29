import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import ContactForm from "@/components/ContactForm.vue";

describe('ContactForm', () => {
    // Mock store setup (simplified example)
    const mockStore = {
        state: {
            contact: {name: '', email: '', message: ''}
        },
        commit: vi.fn()
    };

    it('should set the name', () => {
        const wrapper = mount(ContactForm, {
            global: {
                mocks: {
                    $store: mockStore
                }
            }
        });
        wrapper.find('#name').setValue('John Doe');
        expect(wrapper.vm.contact.name).toBe('John Doe');
    });

    it('should set the email', () => {
        const wrapper = mount(ContactForm, {
            global: {
                mocks: {
                    $store: mockStore
                }
            }
        });
        wrapper.find('#email').setValue('john@example.com');
        expect(wrapper.vm.contact.email).toBe('john@example.com');
    });
});
