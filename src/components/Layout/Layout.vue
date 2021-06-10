<template>
  <v-app class="pa-6">
    <Header />
    <Sidebar />
    <Cart :items="carts" />
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
import Config from "@/config.json";
import { mapActions,  mapState,  } from "vuex";
export default {
  name: "Layout",
  components: { Footer, Header, Sidebar, Cart },

  mounted() {
    this.checkUserLogin();
    this.CartData();
  },
  computed: {
    ...mapState("cart", ["carts"]),
  },
  methods: {
   ...mapActions("cart", ["CartData"]),
    
    checkUserLogin() {
      // send request to check if the user is logged otherwise redirect him to login screen
      if (
        localStorage.getItem("auth_token") !== null &&
        localStorage.getItem("auth_token") !== undefined
      ) {
        this.axios
          .get(Config.BASE_URL + "/api/check-login", {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("auth_token"),
            },
          })
          .then((response) => {
            if (response.data.success !== 1) {
              localStorage.removeItem("auth_token");
              localStorage.removeItem("is_authenticated");
              localStorage.removeItem("user_data");

              this.$router.push("/login");
            }
          })
          .catch((err) => {
            if (err) {
              localStorage.removeItem("auth_token");
              localStorage.removeItem("is_authenticated");
              localStorage.removeItem("user_data");
              this.$router.push("/login");
            }
          });
      }
    },
  },
};
</script>

<style src="./Layout.scss" lang="scss" />
