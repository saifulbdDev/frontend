<template>
  <v-app class="pa-6">
    <Header />
    <Sidebar />
    <v-main class="content">
      <router-view />
    </v-main>
    <Footer />
  </v-app>
</template>

<script>
import Header from "../Header/Header.vue";
import Sidebar from "../Sidebar/Sidebar";
import Footer from "../Footer/Footer";
import "./Layout.scss";

export default {
  name: "Layout",
  components: { Footer, Header, Sidebar },
};
</script>

<style src="./Layout.scss" lang="scss" scoped />
