<template>
  <v-container class>
    <v-row v-if="product_by_category.length">
      <v-col md="3" v-for="item in product_by_category" :key="item.id">
        <v-card
          class
          flat
          @mouseover="overly(item.id)"
          @mouseleave="overlyout(item.id)"
        >
          <div class="imageWrapperWrapper">
            <img :src="img(item.gallery)" />
          </div>
          <div class="product-details">
            <h5 class="item-title">{{ item.title }}</h5>
            <div class="subText">{{ item.amount }} pcs</div>
            <v-card-title class="item-price">{{ item.price }}</v-card-title>
          </div>

          <div class="overly" v-if="overly_id === item.id">
            <div class="quantity-div" v-if="ChackCart(item.id)">
              <p class="remove" @click="decrementQuantity(item)">-</p>
              <p class="quantity">
                <span>{{ Quantity(item) }}</span>
              </p>
              <p class="add" @click="incrementQuantity(item)">+</p>
            </div>
            <p class="addText" v-else>
              Add to Shopping Bag
            </p>
          </div>
        </v-card>

        <v-btn
          v-if="!ChackCart(item.id)"
          class="add_to-cart"
          @click="AddCart(item)"
          block
          >Add bag</v-btn
        >

        <div class="product-qn" v-else-if="ChackCart(item.id)">
          <button class="minusQuantity" @click="decrementQuantity(item)">
            –
          </button>
          <div class="QuantityTextContainer">
            <span>{{ Quantity(item) }}</span>

            <span class="ml-2">in bag</span>
          </div>
          <button class="plusQuantity" @click="incrementQuantity(item)">
            +
          </button>
        </div>
      </v-col>
    </v-row>
    <v-col v-else class="category-title" md="6">
      <h2>
        {{ title($route.params.title) }}
      </h2>
      <span>this Category Product Not available</span>
    </v-col>
  </v-container>
</template>
<script>
import { mapState, mapActions } from "vuex";
export default {
  name: "Home",
  data() {
    return {
      overly_id: "",
      message: {},
      tamp: {},
      tamp_decrement: {},
    };
  },
  computed: {
    ...mapState("product", ["product_by_category"]),
    ...mapState("cart", ["carts"]),
  },

  created() {
    this.CategoryByProduct();
    this.CartData();
  },

  methods: {
    ...mapActions("cart", ["CartData"]),
    CategoryByProduct() {
      this.$store
        .dispatch("product/DataSearch", this.$route.params.id)
        .then(() => {})
        .catch(() => {});
    },
    title(title) {
      var tamptitle = title.split("-");
      return tamptitle[0] + " " + tamptitle[1];
    },
    AddCart(item) {
      let data = {
        product_id: item.id,
        amount: 1,
      };
      this.$store
        .dispatch("cart/Created", data)
        .then(() => {
          this.CartData();
        })
        .catch(() => {});
    },
    incrementQuantity(item) {
      this.carts.forEach((element) => {
        if (element.product_id == item.id) {
          this.tamp = element;
        }
      });

      if (this.tamp.product.amount >= this.tamp.amount_temp) {
        let data = {
          product_id: this.tamp.product_id,
          amount: this.tamp.amount_temp + 1,
        };

        this.$store.dispatch("cart/Update", data).then(this.CartData());
      } else {
        return;
      }
    },
    Quantity(item) {
      var quantity = "";
      this.carts.map((element) => {
        if (element.product_id === item.id) {
          quantity = element.amount;
        }
      });
      return quantity;
    },
    decrementQuantity(item) {
      this.carts.forEach((element) => {
        if (element.product_id == item.id) {
          this.tamp_decrement = element;
        }
      });
      if (this.tamp_decrement.amount_temp <= 1) {
        return;
      }
      let data = {
        product_id: this.tamp_decrement.product_id,
        amount: this.tamp_decrement.amount_temp - 1,
      };

      this.$store.dispatch("cart/Update", data).then(this.CartData());
    },
    ChackCart(productId) {
      return (
        this.carts.find((item) => item.product_id == productId) != undefined
      );
    },

    img(gallery) {
      return gallery[0].image_url?.cart_thumb;
    },
    overly(id) {
      this.overly_id = id;
    },
    overlyout(id) {
      if (this.overly_id === id) {
        this.overly_id = "";
      }
    },
  },
};
</script>
<style scoped>
.product-details {
  text-align: center;
  padding-left: 20px;
  padding-right: 20px;
}
.QuantityTextContainer {
  display: inline-block;
  font-size: 14px;
  font-weight: 700;
  line-height: 36px;
}
.minusQuantity {
  float: left;
  border-right: 1px solid #d55f5f !important;
  border-radius: 3px 0 0 3px !important;
}
.add_to-cart {
  margin-top: 10px;
}
.product-qn {
  background: #ff8182;
  height: 37px;
  text-align: center;
  color: #fff;
  margin-top: 10px;
  -webkit-box-shadow: 1px 1px 1px rgb(204 204 204 / 50%);
  -moz-box-shadow: 1px 1px 1px rgba(204, 204, 204, 0.5);
  box-shadow: 1px 1px 1px rgb(204 204 204 / 50%);
  display: flex;
  justify-content: space-between;
}
.minusQuantity:active,
.plusQuantity:active {
  box-shadow: inset 1px 1px 5px #ff1b1d;
}
.minusQuantity,
.plusQuantity {
  border: none;
  width: 30px;
  background: #ff8182;
  height: 37px;
  outline: 0;
  font-weight: 700;
  color: #fff;
  border-radius: 0 3px 3px 0;
}
.plusQuantity {
  border-left: 1px solid #d55f5f !important;
}
.item-price {
  justify-content: center;
}
.item-title {
  color: #1a1a1a;
  padding-top: 5px;
  font-size: 14px;
  height: 60px;
  text-overflow: ellipsis;
  white-space: normal;
  overflow: hidden;
  margin-bottom: 0px !important;
}
.subText {
  color: #333;
  font-size: 12px;
  font-weight: 400;
  margin-top: 1px;
}
.imageWrapperWrapper {
  width: 200px;
  max-width: 100%;
  margin: 0 auto;
  height: 200px;
}
.imageWrapperWrapper img {
  width: 100%;
}
.overly {
  font-size: 20px;
  position: absolute;
  top: 0;
  left: 0;
  padding-top: 0;
  color: #fff;
  background-color: rgba(40, 40, 40, 0.75);
  text-align: center;
  height: 100%;
  width: 100%;
  border: 1px solid #ccc;
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  -moz-user-select: none;
  -ms-user-select: none;
  -webkit-user-select: none;
  user-select: none;
  padding-bottom: 55px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.remove,
.add {
  color: #fef3d5;
  font-size: 35px;
  border: 3px solid #fef3d5;
  border-radius: 50%;
  height: 33px;
  width: 33px;
  padding-top: 0;
  margin-top: 27px;
  line-height: 19px;
  padding-left: 1px;
  margin: 0px;
  padding: 3px;
}
.overly .quantity-div {
  padding: 0 4px;
  overflow: hidden;
  height: 75px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.quantity-div .quantity {
  font-size: 55px;
  line-height: 83px;
  width: 73px;
  color: #fdd670;
  margin: 0px;
}
.add:hover,
.remove:hover {
  color: #fdd670;
  border-color: #fdd670;
}

p.addText {
  height: 100px;
  width: 125px;
  margin: 30px auto 0;
  color: #fff;
  font-size: 22px;
  line-height: 34px;
  z-index: 2000;
}
.category-title {
  margin: 0 auto;
}
.category-title h2 {
  font-size: 20px;
}
.category-title span {
  font-size: 12px;
}
</style>
