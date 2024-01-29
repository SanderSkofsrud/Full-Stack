<template>
  <form @submit.prevent="submitForm">
    <div>
      <label for="name">Name:</label>
      <input type="text" id="name" v-model="contact.name" required />
    </div>
    <div>
      <label for="email">Email:</label>
      <input type="email" id="email" v-model="contact.email" required />
    </div>
    <div>
      <label for="message">Message:</label>
      <textarea id="message" v-model="contact.message" required></textarea>
    </div>
    <button type="submit" :disabled="isFormInvalid">Submit</button>
  </form>
</template>

<script>
import { ref, watch, computed } from 'vue';
import { useStore } from 'vuex';

export default {
  name: 'ContactForm',
  setup() {
    const store = useStore();
    const contact = ref({
      name: store.state.contact.name,
      email: store.state.contact.email,
      message: ''
    });

    watch(() => contact.value.name, (newName) => {
      store.commit('updateName', newName);
    });

    watch(() => contact.value.email, (newEmail) => {
      store.commit('updateEmail', newEmail);
    });

    const isFormInvalid = computed(() => {
      const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      const isEmailValid = emailRegex.test(contact.value.email);
      return !contact.value.name || !isEmailValid || !contact.value.message;
    });


    const submitForm = async () => {
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
    };


    return { contact, isFormInvalid, submitForm };
  }
};
</script>

<style scoped>
/* Scoped ensures styles only apply to this component */

form {
  max-width: 600px;
  margin: 20px auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

label {
  display: block;
  margin-bottom: 5px;
  color: #333;
}

input[type="text"],
input[type="email"],
textarea {
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid #ddd;
  border-radius: 5px;
  box-sizing: border-box; /* Include padding in width */
}

button {
  background-color: #42b983;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
}

button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

button[type="submit"]:hover:not(:disabled) {
  background-color: #36a569;
}
</style>
