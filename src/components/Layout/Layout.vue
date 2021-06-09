<template>
  <v-app class="pa-6">
    <Header />
    <Sidebar />
    <Cart />
    <v-main class="content">
      <router-view />
    </v-main>
    <Footer />
  </v-app>
</template>

<script>
import Header from "@/components/Header/Header";
import Sidebar from "@/components/Sidebar/Sidebar";
import Cart from "@/components/Cart/Cart";
import Footer from "@/components/Footer/Footer";
import "./Layout.scss";

export default {
  name: "Layout",
  components: { Footer, Header, Sidebar, Cart },
};
</script>

<style src="./Layout.scss" lang="scss" />
