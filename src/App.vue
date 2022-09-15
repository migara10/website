<template>
  <nav-bar />
  <router-view :key="$route.fullPath"></router-view>
  <footer-page />
  <!-- <footer-bar class="d-none"/> -->
</template>

<script>
// import FooterBar from "./components/FooterPage.vue";
import NavBar from "./components/NavBar.vue";
import FooterPage from "./components/FooterPage.vue";

export default {
  name: "App",
  components: {
    /* FooterBar, */
    NavBar,
    FooterPage,
  },
  setup() {},
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Philosopher:ital,wght@0,400;0,700;1,400;1,700&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Yeseva+One&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Philosopher:ital,wght@0,400;0,700;1,400;1,700&display=swap");
$base-font: "Philosopher";
$title-font: "Yeseva One";
</style>
