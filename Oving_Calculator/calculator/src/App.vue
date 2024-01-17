<template>
  <!-- Main Application Template -->
  <nav>
    <!-- Navigation bar for the application -->
    <router-link to="/">Calculator</router-link>
    <router-link to="/contactForm">Contact Form</router-link>
    <!-- router-link is used for SPA navigation, pointing to the root path ("/") -->
    <!-- Additional navigation links can be added here in the future -->
  </nav>
  <!-- Router view acts as a placeholder that displays the component based on the current route -->
  <router-view/>
</template>

<style>
#app {
  /* Styles for the main App container */
  font-family: Avenir, Helvetica, Arial, sans-serif; /* Font family for the app */
  -webkit-font-smoothing: antialiased; /* Enhances text rendering on Webkit browsers */
  -moz-osx-font-smoothing: grayscale; /* Text smoothing for Firefox on MacOS */
  text-align: center; /* Centers text and inline elements */
  color: #2c3e50; /* Base text color */
}

nav {
  /* Styles for the navigation bar */
  padding: 30px; /* Padding around the nav element for spacing */
}

nav a {
  /* Styles for navigation links */
  font-weight: bold; /* Bold font for emphasis */
  color: #2c3e50; /* Text color matching the app's theme */
}

nav a.router-link-exact-active {
  /* Style for the active navigation link */
  color: #42b983; /* Different color to indicate the currently active route/link */
}
</style>
