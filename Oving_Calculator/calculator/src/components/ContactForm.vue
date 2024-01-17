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
import { ref, computed } from 'vue';
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

    const isFormInvalid = computed(() => {
      return !contact.value.name || !contact.value.email || !contact.value.message;
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
