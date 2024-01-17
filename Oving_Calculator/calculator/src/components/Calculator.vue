<template>
  <!-- Calculator Component Template -->
  <div class="calculator" ref="calculator" @keydown="keyInput" tabindex="0">
    <!-- Display Input, using textarea for multiline support and readability -->
    <textarea v-model="displayInput" readonly></textarea>

    <!-- Calculator Buttons -->
    <div class="button-row">
      <!-- Basic operations -->
      <!-- @click.prevent is used to prevent the default click behavior -->
      <button @click.prevent="appendToInput('(')"> (</button>
      <button @click.prevent="appendToInput(')')"> )</button>
      <button @click.prevent="backspace"> ⌫</button>
      <button @click.prevent="clear"> AC</button>
    </div>
    <!-- Repeated button rows for numeric inputs and operators -->
    <!-- v-for creates buttons for each number in the array -->
    <!-- ... (similar structure for other button rows) ... -->
    <div class="button-row">
      <button v-for="num in [7, 8, 9]" :key="num" @click.prevent="appendToInput(num.toString())"> {{ num }}</button>
      <button @click.prevent="appendToInput('/')"> ÷</button>
    </div>
    <div class="button-row">
      <button v-for="num in [4, 5, 6]" :key="num" @click.prevent="appendToInput(num.toString())"> {{ num }}</button>
      <button @click.prevent="appendToInput('*')"> ×</button>
    </div>
    <div class="button-row">
      <button v-for="num in [1, 2, 3]" :key="num" @click.prevent="appendToInput(num.toString())"> {{ num }}</button>
      <button @click.prevent="appendToInput('-')"> -</button>
    </div>
    <div class="button-row">
      <button @click.prevent="appendToInput('0')"> 0</button>
      <button @click.prevent="appendToInput('.')"> .</button>
      <button @click.prevent="appendToInput(lastAnswer)"> Ans</button>
      <button @click.prevent="appendToInput('+')"> +</button>
    </div>
    <!-- Calculate button, using flex-grow 2 to make it fit the whole line -->
    <div class="button-row">
      <button @click.prevent="calculate" style="flex-grow: 2;"> =</button>
    </div>

    <!-- Log Section - Passes calculation history to CalculatorLog component -->
    <CalculatorLog :calculations="calculationLog"/>
  </div>
</template>

<script>
import {evaluate} from 'mathjs'; // Importing 'evaluate' function from the mathjs library for calculation
import CalculatorLog from "@/components/CalculatorLog.vue"; // Importing CalculatorLog component

export default {
  name: 'SimpleCalculator', // Component name
  components: {CalculatorLog}, // Declaring CalculatorLog as a child component

  // Data properties to maintain the state of the calculator
  data() {
    return {
      currentInput: '', // Stores the current input string
      calculationLog: [], // Array to store history of calculations
      lastAnswer: '', // Stores the result of the last calculation
      justCalculated: false, // Flag to indicate if the last action was a calculation
      isError: false, // Flag to indicate if there's an error in calculation
    };
  },

  // Lifecycle hook - called after the component is mounted
  mounted() {
    // Sets focus on the calculator element for keyboard input
    this.$refs.calculator.focus();
  },

  // Methods for various functionalities of the calculator
  methods: {
    // Appends the given value to the current input
    appendToInput(value) {
      // If the last action was a calculation and the new value is a number, reset the input
      if (this.justCalculated) {
        if (this.isNumber(value)) {
          this.currentInput = '';
        }
        this.justCalculated = false;
      } else if (this.isError) {
        // If there's an error, reset the input
        this.resetInput();
      }
      // Prevent multiple decimal points in a single number
      if (value === '.' && this.currentInput.split(/[+\-*/]/).pop().includes('.')) {
        return;
      }
      // Prevent invalid sequences of operators
      const lastChar = this.currentInput.slice(-1);
      if ("+-*/".includes(lastChar) && "+-*/".includes(value)) {
        return;
      }
      // Append the value to the current input string
      this.currentInput += value;
      // Refocus on the calculator element
      this.$refs.calculator.focus();
    },

    // Perform the calculation
    calculate() {
      if (!this.areParenthesesBalanced()) {
        // Check for balanced parentheses
        this.currentInput = 'Parentheses not balanced';
        this.isError = true;
        this.justCalculated = false;
        return;
      }
      try {
        // Check for invalid operations like division by zero
        if (this.checkInvalidOperations(this.currentInput)) {
          throw new Error('Division by zero is not allowed');
        }
        // Calculate the result using mathjs's evaluate function
        const result = this.safeCalculate(this.currentInput).toString();
        // Update the calculation log with the expression and result
        this.updateCalculationLog(this.currentInput, result);
        // Update lastAnswer and currentInput with the result
        this.lastAnswer = result;
        this.currentInput = result;
        // Set flags indicating successful calculation and no error
        this.justCalculated = true;
        this.isError = false;
      } catch (error) {
        // Handle any calculation errors
        this.currentInput = error.message || 'Error';
        // Set flags indicating calculation error
        this.isError = true;
        this.justCalculated = false;
      }
      // Refocus on the calculator element
      this.$refs.calculator.focus();
    },

    // Check for invalid operations in the expression
    checkInvalidOperations(expression) {
      // Currently checks for division by zero
      return expression.includes('/0');
    },

    // Removes the last character from the current input
    backspace() {
      this.currentInput = this.currentInput.slice(0, -1);
    },

    // Resets the input to its initial state
    clear() {
      this.resetInput();
    },

    // Handles keyboard inputs
    keyInput(event) {
      const key = event.key;
      // Append the key to input if it's a number or an operator
      if ((key >= '0' && key <= '9') || "()+-*/.".includes(key)) {
        this.appendToInput(key);
      } else if (key === 'Enter') {
        // Perform calculation on Enter key
        this.calculate();
      } else if (key === 'Backspace') {
        // Remove the last character on Backspace key
        this.backspace();
      } else if (key === 'Escape') {
        // Clear input on Escape key
        this.clear();
      }
    },

    // Checks if the given value is a number
    isNumber(value) {
      // Returns true if value is a number, false otherwise
      return !isNaN(value);
    },

    // Checks if the parentheses in the expression are balanced
    areParenthesesBalanced() {
      const expression = this.currentInput;
      let balance = 0;
      for (let char of expression) {
        if (char === '(') balance++;
        if (char === ')') balance--;
        if (balance < 0) return false; // Closing parenthesis before an opening
      }
      return balance === 0; // True if balanced, false otherwise
    },

    // Resets the input and related flags
    resetInput() {
      this.currentInput = '';
      this.justCalculated = false;
      this.isError = false;
    },

    // Safely calculates the expression, handling any exceptions
    safeCalculate(expression) {
      try {
        // Use mathjs's evaluate function to calculate the expression
        return evaluate(expression);
      } catch (error) {
        if (error instanceof SyntaxError) {
          // Handle syntax errors
          throw new Error('Invalid expression');
        } else if (error instanceof TypeError) {
          // Handle type errors
          throw new Error('Invalid expression');
        } else {
          // Throw an error for invalid operations
          throw new Error('Invalid operation');
        }
      }
    },

    // Updates the calculation log with the expression and result
    updateCalculationLog(expression, result) {
      // Unshift adds the new calculation at the beginning of the array
      this.calculationLog.unshift({expression, result});
    }
  },

  // Computed property for displaying the input
  computed: {
    displayInput() {
      // Returns the current input or '0' if the input is empty
      return this.currentInput || '0';
    }
  },
};
</script>

<style>
.calculator {
  /* Main container style for the calculator */
  display: flex; /* Flexbox layout for better alignment of child elements */
  flex-direction: column; /* Organizes child elements in a column */
  align-items: center; /* Centers child elements horizontally */
  background-color: #333; /* Dark background color for the calculator */
  border-radius: 10px; /* Rounded corners for aesthetic appeal */
  padding: 1.5vh 1.5vw; /* Vertical and horizontal padding for spacing */
  width: 20vw; /* Relative width to viewport width */
  max-width: 600px; /* Maximum width to ensure it doesn't get too large */
  max-height: 600px; /* Maximum height to ensure it doesn't get too tall */
  margin: 5vh auto; /* Vertical margin for spacing and horizontal auto for centering */
}

.calculator textarea {
  /* Style for the display textarea where input/output is shown */
  width: calc(100% - 20px); /* Full width minus fixed pixel value for padding */
  font-size: 1.5vw; /* Font size relative to viewport width */
  padding: 1vw; /* Padding inside the textarea */
  background-color: #222; /* Darker background for contrast with the calculator */
  color: #fff; /* White text color for readability */
  border: none; /* No border for a cleaner look */
  border-radius: 5px; /* Slightly rounded corners */
  margin-bottom: 15px; /* Bottom margin for spacing below the textarea */
  resize: none; /* Disables resizing of the textarea */
  height: 40px; /* Fixed height for a consistent look */
}

.button-row {
  /* Style for each row of buttons */
  display: flex; /* Flexbox for inline alignment of buttons */
  justify-content: space-between; /* Evenly spaces buttons in the row */
  width: 100%; /* Full width to align with the calculator's width */
  margin-bottom: 8px; /* Bottom margin for spacing between rows */
}

.button-row button {
  /* Style for each button in the rows */
  flex: 1; /* Flex-grow set to 1 to allow buttons to grow and fill the row */
  margin: 0 3px; /* Margin for spacing between buttons */
  padding: 1.5vw; /* Padding for button size */
  font-size: 1.2vw; /* Font size relative to viewport width */
  color: white; /* Text color for the buttons */
  background-color: #555; /* Background color for buttons */
  border: none; /* No border for a cleaner look */
  border-radius: 5px; /* Rounded corners for buttons */
}

.button-row button:active {
  /* Style for button when actively clicked */
  background-color: #777; /* Slightly lighter color on click for feedback */
}

.calculator:focus {
  /* Style when the calculator is focused, e.g., after a key press */
  outline: none; /* Removes default focus outline for a cleaner look */
}

@media (max-width: 1000px) {
  /* Media query for responsiveness on smaller screens */
  .calculator {
    width: 80vw; /* Increased relative width for smaller screens */
    font-size: 4vw; /* Increased font size for better readability */
  }

  .calculator textarea {
    font-size: 4vw; /* Increased font size for the textarea */
  }

  .button-row button {
    font-size: 3vw; /* Increased font size for buttons */
  }
}
</style>
