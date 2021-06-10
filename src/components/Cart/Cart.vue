/* eslint-disable vue/valid-v-bind */
<template>
  <div>
    <section class="stickyHeader" v-if="CART_STATE !== true" @click="TOGGLE_CART">
      <div class="itemCount">
        <v-icon large class="text-center" color="#fdd670">mdi-shopping</v-icon>
        <p>
          <span>{{items.length}} ITEMS</span>
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
      <v-btn @click="TOGGLE_CART">dd {{(60 / 100) * windowHeight}}</v-btn>

      <v-list
        class="cart-body"
        flat
        subheader
        three-line
        v-bind:style="{ height:(70 / 100) * windowHeight + 'px' }"
      >
        <v-subheader></v-subheader>

        <!-- <v-list-item-group v-model="settings" active-class> -->
        <template v-for="item in items">
          <v-list-item :key="'item_'+item.id">
            <v-list-item-action>
              <v-btn icon small>
                <v-icon dark right>mdi-chevron-up</v-icon>
              </v-btn>
              <v-btn icon small>
                <v-icon dark right>mdi-chevron-down</v-icon>
              </v-btn>
            </v-list-item-action>

            <div class="img-div">
              <img :src="img(item.product.gallery)" />
            </div>
            <div class="item-title">
              <span>{{item.product.title}}</span>
              <div class="subText">
                <span>৳</span>
                <span>200</span>
                <span>/ 80 pcs</span>
              </div>
              <!-- <span>৳ {{item.total_price_numeric}}</span> -->
            </div>
            <div class="amount">
              <section>
                <div class="discountAmount">
                  <span>462</span>
                </div>
                <div class="total isStrikeThrough">
                  <span>৳</span>
                  <span>675</span>
                </div>
              </section>
              <div class="remove" title="Remove from bag" @click="removeCart(item.id)">
                <v-icon small>mdi-close</v-icon>
              </div>
            </div>
          </v-list-item>
          <v-divider :key="item.id"></v-divider>
        </template>
        <!-- </v-list-item-group> -->
      </v-list>
      <div class="palce_holder">
        <button id="placeOrderButton">
          <span class="placeOrderText">Place Order</span>
          <span class="totalMoneyCount">
            <span>৳</span>
            <span>4,853</span>
            <span></span>
          </span>
        </button>
      </div>
      <v-btn color="#ff8641" class="text--white" block>
        <v-icon>mdi-whatsapp</v-icon>Live Chat
      </v-btn>
    </v-navigation-drawer>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  props: {
    items: Array,
  },
  data() {
    return {
      sidebarWidth: 320,
      sidebarMinWidth: 0,
      windowHeight: window.innerHeight,
      txt: "",
    };
  },
  watch: {
    windowHeight(newHeight, oldHeight) {
      this.txt = `it changed to ${newHeight} from ${oldHeight}`;
    },
  },
  mounted() {
    this.$nextTick(() => {
      window.addEventListener("resize", this.onResize);
    });
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.onResize);
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
    ...mapActions("cart", ["CartData"]),
    img(gallery) {
      return gallery[0].image_url?.cart_thumb;
    },
    onResize() {
      this.windowHeight = window.innerHeight;
    },
    removeCart(id) {
      if (confirm("Are you sure?")) {
        this.$store
          .dispatch("cart/Delete", id)
          .then((res) => {
            this.message = res.data.message;
            this.CartData();
          })
          .catch(() => {});
      }
    },
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
.stickyHeader:hover {
  opacity: 1;
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
.img-div {
  width: 60px;
  max-height: 60px;
  text-align: center;
}
.img-div img {
  max-width: 40px;
  max-height: 40px;
}
.item-title {
  width: 145px;
  font-size: 13px;
}
.cart-body {
  width: 100%;
  box-sizing: border-box;
  overflow: auto;
  padding: 0px;
}
div.amount {
  min-width: 85px;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
  -ms-flex-align: center;
  -webkit-align-items: center;
  -webkit-box-align: center;
  align-items: center;
  width: 75px;
  text-align: left;
  vertical-align: middle;
}
div.amount section {
  float: left;
  font-size: 12px;
  flex: 1;
}
.discountAmount {
  color: red;
}
.isStrikeThrough {
  text-decoration: line-through;
}
.palce_holder {
  text-align: center;
}
.palce_holder #placeOrderButton {
  width: 90%;
  height: 40px;
  background: #ff8182;
  border: none;
  color: #fff;
  font-size: 17px;
  line-height: 37px;
  padding: 0;
  margin: 20px auto;
  -webkit-box-shadow: 0 0 3px #b1aeae;
  -moz-box-shadow: 0 0 3px #b1aeae;
  box-shadow: 0 0 3px #b1aeae;
  -webkit-border-radius: 2px;
  -moz-border-radius: 2px;
  border-radius: 2px;
}
.totalMoneyCount {
  background: #e04f54;
  float: right;
  height: 100%;
  width: 40%;
  margin-right: -5px;
  line-height: 40px;
  -webkit-border-radius: 0 2px 2px 0;
  -moz-border-radius: 0 2px 2px 0;
  border-radius: 0 2px 2px 0;
}
.remove {
  float: right;
  margin-right: 8px;
  line-height: 20px;
  font-size: 15px;
  text-align: right;
  cursor: pointer;
}
.v-icon:hover {
  color: #e04f54 !important;
}
</style>
