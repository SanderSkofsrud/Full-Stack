<template>
  <div class="home">
    <h1>Welcome to Simple Calculator!</h1>
    <p>Explore our calculator and share your feedback.</p>

    <!-- Display reviews in cards -->
    <div class="reviews">
      <button class="arrow left" @click="prevReview">&#10094;</button>
      <div class="review-container">
        <div v-for="(review) in displayReviews" :key="review.id" class="review-card"
             :class="{ 'blurred': review.blurred }">
          <h2>{{ review.name }}</h2>
          <h4>{{ review.email }}</h4>
          <p>{{ review.message }}</p>
        </div>
      </div>
      <button class="arrow right" @click="nextReview">&#10095;</button>
    </div>
  </div>
</template>

<script>
import {ref, computed, onMounted} from 'vue';

export default {
  name: 'HomePage',
  setup() {
    const reviews = ref([]);
    const currentIndex = ref(0);

    const nextIndex = computed(() => (currentIndex.value + 1) % reviews.value.length);

    const nextReview = () => {
      currentIndex.value = (currentIndex.value + 1) % reviews.value.length;
    };

    const prevReview = () => {
      currentIndex.value = currentIndex.value - 1 < 0 ? reviews.value.length - 1 : currentIndex.value - 1;
    };

    const displayReviews = computed(() => {
      let displayedReviews = [];
      let totalReviews = reviews.value.length;
      if (totalReviews > 0) {
        for (let i = -2; i <= 3; i++) {
          let index = (currentIndex.value + i + totalReviews) % totalReviews;
          displayedReviews.push({
            ...reviews.value[index],
            blurred: i === -2 || i === 3
          });
        }
      }
      return displayedReviews;
    });

    onMounted(async () => {
      const response = await fetch('http://localhost:3000/contacts');
      reviews.value = await response.json();
    });

    return { reviews, nextReview, prevReview, nextIndex, displayReviews };
  }
};
</script>


<style scoped>
.home {
  text-align: center;
  padding: 20px;
}

/*.reviews {
  position: relative;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
  align-items: center;
}*/

.reviews {
  display: flex;
  justify-content: center;
  align-items: center;
}

.review-card {
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  width: 300px;
  flex: 0 0 auto; /* Prevents cards from shrinking */
  transition: transform 0.3s ease-in-out;
}

.review-card h2 {
  margin-bottom: 5px;
}

.review-card h4 {
  margin-top: 5px;
  color: #777;
}

.review-card:hover {
  transform: scale(1.05);
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
}

/*.arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background-color: transparent;
  border: none;
  font-size: 30px;
  cursor: pointer;
}*/

.arrow {
  cursor: pointer;
  background: none;
  border: none;
  font-size: 24px;
  padding: 10px;
}

.arrow:focus {
  outline: none;
}

.review-container {
  overflow: hidden;
  display: flex;
  width: calc(300px * 4 + 40px * 3); /* Adjust based on review-card width and gap */
  margin: 0 20px; /* Space for partially visible reviews */
}

.review-card.next {
  opacity: 0.5;
  filter: blur(4px);
}

.review-card:not(:nth-child(-n+4)) {
  display: none;
}

.review-card.blurred {
  filter: blur(2px);
}

</style>
