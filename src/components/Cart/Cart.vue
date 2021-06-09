/* eslint-disable vue/valid-v-bind */
<template>
  <div>
    <section
      class="stickyHeader"
      v-if="CART_STATE !== true"
      @click="TOGGLE_CART"
    >
      <div class="itemCount">
        <v-icon large class="text-center" color="#fdd670">mdi-shopping</v-icon>
        <p>
          <span>8 ITEMS {{$vuetify.breakpoint.mdAndUp}}</span>
        </p>
      </div>
      <div class="total"></div>
    </section>
    <v-navigation-drawer
      v-else
      fixed
      app
      clipped
      v-model="CART_STATE"
      :mini-variant="!CART_STATE"
      :width="sidebarWidth"
      :permanent="$vuetify.breakpoint.mdAndUp"
      :temporary="$vuetify.breakpoint.smAndDown"
      :mini-variant-width="sidebarMinWidth"
      :class="{ 'CART-mini': CART_STATE }"
      right
    >
      <v-btn @click="TOGGLE_CART">dd</v-btn>
    </v-navigation-drawer>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  props: {
    source: String,
  },
  data() {
    return {
      sidebarWidth: 320,
      sidebarMinWidth: 0,
    };
  },
  computed: {
    ...mapState("layout", ["cart"]),
    CART_STATE: {
      get() {
        return this.cart;
      },
      set(newValue) {
        if (newValue === this.cart) return;
        this.TOGGLE_CART();
      },
    },
  },
  methods: {
    ...mapActions("layout", ["TOGGLE_CART"]),
  },
};
</script>
<style scoped>
.CART-mini {
  background-color: #fff;
  box-sizing: border-box;
  box-shadow: -2px 0 12px 0 rgb(143 143 143 / 38%);
}
.stickyHeader {
  opacity: 0.7;
  cursor: pointer;
  position: fixed;
  width: 65px;
  height: 75px;
  background: #f5fceb;
  right: 0;
  top: calc(110px + 30%);
  box-shadow: 0 0 16px -1px rgb(0 0 0 / 75%);
  z-index: 2000;
  transition: 0.1s ease-in-out;
}
.stickyHeader:hover{
    opacity:1;
}
.stickyHeader div.itemCount {
  height: 50px;
  background: #55584d;
  width: 100%;
  text-align: center;
}
.stickyHeader div.itemCount p {
  color: #fdd670;
  margin-top: -2px;
  margin-bottom: 0;
  font-weight: 700;
  font-size: 12px;
  text-align: center;
  padding-top: 0;
}
</style>
