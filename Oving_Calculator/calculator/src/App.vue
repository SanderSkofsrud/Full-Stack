<template>
  <!-- Main Application Template -->
  <nav>
    <!-- Navigation bar for the application -->
    <router-link to="/">Home</router-link>
    <router-link to="/calculator">Calculator</router-link>
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
  padding-top: 50px; /* This should be equal or greater than the height of the nav bar */
}

html, body {
  /* Styles for the HTML and body elements */
  margin: 0; /* Removes the default margin */
  padding: 0; /* Removes the default padding */
  height: 100%; /* Sets the height to 100% of the viewport */
  width: 100%; /* Sets the width to 100% of the viewport */
  overflow-x: hidden; /* Prevents horizontal scrolling */
}

nav {
  /* Styles for the navigation bar */
  background-color: #333; /* Background color for the nav element */
  padding: 10px 0; /* Padding around the nav element for spacing */
  margin: 0; /* Removes the default margin */
  position: fixed; /* Fixes the nav element to the top of the viewport */
  top: 0; /* Sets the top position to 0 */
  left: 0; /* Sets the left position to 0 */
  right: 0; /* Sets the right position to 0 */
  width: 100%; /* Sets the width to 100% of the viewport */
  z-index: 1000; /* Sets the z-index to 1000 to ensure the nav element is on top of other elements */
}

nav a {
  /* Styles for navigation links */
  font-weight: bold; /* Bold font for emphasis */
  color: #fff; /* Text color matching the app's theme */
  padding: 10px 15px; /* Padding around the links for spacing */
  text-decoration: none; /* Removes the default underline on links */
  margin: 0 5px; /* Spacing between links */
  display: inline-block; /* Displays the links in a row */
  border-radius: 5px; /* Rounded corners for the links */
  transition: background-color 0.3s;
}

nav a.hover {
  /* Style for the hover state of the navigation links */
  background-color: #42b983; /* Darker background color to indicate the hover state */
}

nav a.router-link-exact-active {
  /* Style for the active navigation link */
  color: #42b983; /* Different color to indicate the currently active route/link */
}
</style>
