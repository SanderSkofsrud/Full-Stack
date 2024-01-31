<template>
  <!-- HomePage Component Template -->
  <!-- Main container for the home page -->
  <div class="home">
    <h1>Welcome to Simple Calculator!</h1> <!-- Main heading -->
    <p>Explore our calculator and share your feedback.</p> <!-- Introduction text -->

    <!-- Container for displaying user reviews -->
    <div class="reviews">
      <!-- Buttons to navigate through reviews -->
      <button class="arrow left" @click="prevReview">&#10094;</button>
      <div class="review-container">
        <!-- Iterating over displayed reviews -->
        <div v-for="(review) in displayReviews" :key="review.id" class="review-card"
             :class="{ 'blurred': review.blurred }">
          <h2>{{ review.name }}</h2> <!-- Reviewer's name -->
          <h4>{{ review.email }}</h4> <!-- Reviewer's email -->
          <p>{{ review.message }}</p> <!-- Review message -->
        </div>
      </div>
      <button class="arrow right" @click="nextReview">&#10095;</button>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue';

export default {
  name: 'HomePage',
  setup() {
    // State for storing reviews
    const reviews = ref([]);
    // Current index for the displayed review
    const currentIndex = ref(0);

    // Computed property for calculating next index
    const nextIndex = computed(() => (currentIndex.value + 1) % reviews.value.length);

    // Methods for navigating reviews
    const nextReview = () => {
      currentIndex.value = (currentIndex.value + 1) % reviews.value.length;
    };
    const prevReview = () => {
      currentIndex.value = currentIndex.value - 1 < 0 ? reviews.value.length - 1 : currentIndex.value - 1;
    };

    // Computed property to determine which reviews to display
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

    // Fetching reviews data on component mount
    onMounted(async () => {
      const response = await fetch('http://localhost:3000/contacts');
      reviews.value = await response.json();
    });

    return { reviews, nextReview, prevReview, nextIndex, displayReviews };
  }
};
</script>

<style scoped>
/* Scoped styles specific to HomePage component */

.home {
  /* Styling for the home page container */
  text-align: center; /* Centers the text and elements */
  padding: 20px; /* Padding around the content */
}

.reviews {
  /* Styling for the reviews section */
  display: flex; /* Flex display for alignment of review cards */
  justify-content: center; /* Centering the review cards horizontally */
  align-items: center; /* Centering the review cards vertically */
}

.review-card {
  /* Styling for individual review cards */
  padding: 15px; /* Padding inside each card */
  border: 1px solid #ddd; /* Border for definition */
  border-radius: 10px; /* Rounded corners for aesthetics */
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); /* Subtle shadow for depth */
  width: 300px; /* Fixed width for uniformity */
  flex: 0 0 auto; /* Flex settings to prevent shrinking */
  transition: transform 0.3s ease-in-out; /* Transition for hover effect */
}

.review-card h2, .review-card h4 {
  /* Styling for reviewer's name and email */
  margin-bottom: 5px; /* Margin for spacing */
}

.review-card h4 {
  /* Additional styling for reviewer's email */
  color: #777; /* Lighter text color for contrast */
}

.review-card:hover {
  /* Hover effect for review cards */
  transform: scale(1.05); /* Slight increase in size */
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2); /* Darker shadow for emphasis */
}

.arrow {
  /* Styling for navigation arrows */
  cursor: pointer; /* Changes cursor to pointer to indicate interactivity */
  background: none; /* Transparent background */
  border: none; /* No border for a clean look */
  font-size: 24px; /* Font size for visibility */
  padding: 10px; /* Padding for easier interaction */
}

.arrow:focus {
  /* Removes focus outline for cleaner appearance */
  outline: none;
}

.review-container {
  /* Container styling for review cards */
  overflow: hidden; /* Hides overflowed parts of the container */
  display: flex; /* Flex display for alignment of cards */
  width: calc(300px * 4 + 40px * 3); /* Calculated width based on card width and gap */
  margin: 0 20px; /* Horizontal margin for spacing */
}

.review-card.blurred {
  /* Styling for blurred cards (partially visible) */
  filter: blur(2px); /* Blurring effect for a depth feel */
}

.review-card.next {
  /* Additional styling for next review card */
  opacity: 0.5; /* Reduced opacity for background effect */
  filter: blur(4px); /* Increased blurring */
}

.review-card:not(:nth-child(-n+4)) {
  /* Hides additional cards beyond the fourth one */
  display: none;
}
</style>
