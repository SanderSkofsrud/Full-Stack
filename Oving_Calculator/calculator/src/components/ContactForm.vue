<template>
  <!-- ContactForm Component Template -->
  <!-- Form structure with input fields for name, email, and message -->
  <form @submit.prevent="submitForm">
    <!-- Name input field -->
    <div>
      <label for="name">Name:</label>
      <input type="text" id="name" v-model="contact.name" required />
    </div>

    <!-- Email input field -->
    <div>
      <label for="email">Email:</label>
      <input type="email" id="email" v-model="contact.email" required />
    </div>

    <!-- Message input field -->
    <div>
      <label for="message">Message:</label>
      <textarea id="message" v-model="contact.message" required></textarea>
    </div>

    <!-- Submit button, disabled if the form is invalid -->
    <button type="submit" :disabled="isFormInvalid">Submit</button>
  </form>
</template>

<script>
import { ref, watch, computed } from 'vue';
import { useStore } from 'vuex';

export default {
  name: 'ContactForm',
  setup() {
    // Using Vuex store for state management
    const store = useStore();
    // Contact form state with reactivity
    const contact = ref({
      name: store.state.contact.name,
      email: store.state.contact.email,
      message: ''
    });

    // Watches for changes in name and email to update the Vuex store
    watch(() => contact.value.name, (newName) => {
      store.commit('updateName', newName);
    });
    watch(() => contact.value.email, (newEmail) => {
      store.commit('updateEmail', newEmail);
    });

    // Computed property to validate form fields
    const isFormInvalid = computed(() => {
      const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      const isEmailValid = emailRegex.test(contact.value.email);
      return !contact.value.name || !isEmailValid || !contact.value.message;
    });

    // Function to handle form submission
    const submitForm = async () => {
      try {
        const response = await fetch('http://localhost:3000/contacts', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(contact.value)
        });

        const data = await response.json();
        if (data) {
          alert('Success');
          store.commit('updateContact', contact.value);
        }
      } catch (error) {
        alert(error.message); // Alert the error message
      }
    };

    return { contact, isFormInvalid, submitForm };
  }
};
</script>

<style scoped>
/* Scoped styles specific to ContactForm component */

form {
  /* Styling for the form layout */
  max-width: 600px; /* Maximum width of the form */
  margin: 20px auto; /* Centering the form with margin */
  padding: 20px; /* Padding inside the form */
  background-color: #f9f9f9; /* Light background color for the form */
  border-radius: 10px; /* Rounded corners for the form */
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); /* Box shadow for a subtle 3D effect */
}

label {
  /* Style for labels */
  display: block; /* Block display for full-width labels */
  margin-bottom: 5px; /* Space below each label */
  color: #333; /* Dark color for label text */
}

input[type="text"],
input[type="email"],
textarea {
  /* Styles for text and email input fields and textarea */
  width: 100%; /* Full width to fill the form */
  padding: 10px; /* Padding for better text visibility and interaction */
  margin-bottom: 20px; /* Margin at the bottom of each input field */
  border: 1px solid #ddd; /* Subtle border for the input fields */
  border-radius: 5px; /* Slightly rounded corners for the inputs */
  box-sizing: border-box; /* Box-sizing to include padding in width and height */
}

button {
  /* Style for the submit button */
  background-color: #42b983; /* Green background color for visibility */
  color: white; /* White text for contrast */
  padding: 10px 15px; /* Padding for a larger clickable area */
  border: none; /* No border for a cleaner look */
  border-radius: 5px; /* Rounded corners to match the form's style */
  cursor: pointer; /* Cursor changes to pointer to indicate button functionality */
  font-size: 1rem; /* Font size for readability */
}

button:disabled {
  /* Style for disabled button state */
  background-color: #ccc; /* Light grey color to indicate non-interactive state */
  cursor: not-allowed; /* Cursor changes to indicate disabled state */
}

button[type="submit"]:hover:not(:disabled) {
  /* Hover style for the submit button when it's not disabled */
  background-color: #36a569; /* Slightly darker shade of green on hover */
}
</style>
