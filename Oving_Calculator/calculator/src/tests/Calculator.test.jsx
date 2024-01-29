import {describe, it, expect} from 'vitest';
import {mount} from '@vue/test-utils';
import SimpleCalculator from '@/components/Calculator.vue';

describe('SimpleCalculator', () => {
    const simulateUserInput = (wrapper, sequence) => {
        sequence.forEach(input => {
            wrapper.vm.appendToInput(input);
        });
    };

    it('should add two numbers', () => {
        const wrapper = mount(SimpleCalculator);
        simulateUserInput(wrapper, ['1', '+', '2']);
        wrapper.vm.calculate();
        expect(wrapper.vm.displayInput).toBe('3');
    });

    it('should subtract two numbers', () => {
        const wrapper = mount(SimpleCalculator);
        simulateUserInput(wrapper, ['5', '-', '2']);
        wrapper.vm.calculate();
        expect(wrapper.vm.displayInput).toBe('3');
    });

    it('should multiply two numbers', () => {
        const wrapper = mount(SimpleCalculator);
        simulateUserInput(wrapper, ['3', '*', '2']);
        wrapper.vm.calculate();
        expect(wrapper.vm.displayInput).toBe('6');
    });

    it('should divide two numbers', () => {
        const wrapper = mount(SimpleCalculator);
        simulateUserInput(wrapper, ['6', '/', '2']);
        wrapper.vm.calculate();
        expect(wrapper.vm.displayInput).toBe('3');
    });

    it('should reset the calculator', () => {
        const wrapper = mount(SimpleCalculator);
        simulateUserInput(wrapper, ['6', '/', '2']);
        wrapper.vm.calculate();
        wrapper.vm.clear();
        expect(wrapper.vm.displayInput).toBe('0');
    });
});
