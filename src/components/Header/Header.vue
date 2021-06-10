<template>
  <v-app-bar class="main-header" height="64" fixed flat light color="secondary">
    <v-btn icon class="mx-1" @click.stop="TOGGLE_DRAWER">
      <template v-if="DRAWER_STATE">
        <v-icon style="font-size: 28px">mdi-arrow-left</v-icon>
      </template>
      <template v-else>
        <v-icon style="font-size: 28px">mdi-menu</v-icon>
      </template>
    </v-btn>
    <v-btn to="/" text>Tasks</v-btn>
    <v-spacer></v-spacer>

    <Search />

    <v-btn to="/login">Login</v-btn>
  </v-app-bar>
</template>

<script>
import { mapActions, mapState } from "vuex";
import config from "../../config";
import Search from "@/components/Search/Search";

export default {
  name: "Header",
  components: { Search },
  data: () => ({
    config,
    searchCollapse: true,
  }),
  computed: {
    ...mapState("layout", ["drawer"]),
    DRAWER_STATE: {
      get() {
        return this.drawer;
      },
    },
  },
  methods: {
    ...mapActions("layout", ["TOGGLE_DRAWER"]),
    logOut: function() {
      localStorage.removeItem("auth_token");
      localStorage.removeItem("is_authenticated");
      localStorage.removeItem("user_data");
      this.$router.push("/login");
    },
  },
};
</script>

<style src="./Header.scss" lang="scss"></style>
