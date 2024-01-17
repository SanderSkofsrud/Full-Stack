<template>
  <!-- Component Template for CalculatorLog -->
  <div class="calculation-log">
    <!-- Iterating over each calculation passed as a prop -->
    <div v-for="(calculation, index) in calculations" :key="index" class="calculation">
      <!-- Displaying the calculation expression and its result -->
      {{ calculation.expression }} = {{ calculation.result }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'CalculatorLog',
  props: {
    // Accepts 'calculations' prop, which is an array of calculation objects
    calculations: Array
  },
  // No data, computed properties, or methods needed as this component
  // is solely for displaying passed data.
};
</script>

<style>
.calculation-log {
  /* Styling for the calculation log container */
  margin-top: 15px; /* Top margin for spacing from the preceding elements */
  width: 100%; /* Full width to align with the parent container */
  max-height: 150px; /* Maximum height to limit the size of the log */
  overflow-y: auto; /* Enables vertical scrolling for overflow content */
  background-color: #222; /* Dark background for contrast and readability */
  color: #fff; /* White text color for high readability */
  padding: 10px; /* Padding inside the log container */
  border-radius: 5px; /* Rounded corners for aesthetic consistency */
}
</style>
