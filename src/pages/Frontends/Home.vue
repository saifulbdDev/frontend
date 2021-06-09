<template>
  <v-container>
    <v-row>
      <v-col md="3" v-for="item in products" :key="item.id">
        <v-card
          class=""
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
         

          <div class="overly"   v-if="overly_id === item.id">
            <div class="quantity-div">
              <p
                class="remove"
               
              >
                -
              </p>
              <p
                class="quantity"
               
              >
                <span
                 
                  >1</span
                >
              </p>
              <p
                class="add"
               
              >
                +
              </p>
            </div>
          </div>
        </v-card>
        <div class="product-qn">
          <button class="minusQuantity">–</button>
          <div class="QuantityTextContainer">
            <span>12</span><span> </span><span>in bag</span>
          </div>
          <button class="plusQuantity">+</button>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import { mapActions, mapState } from "vuex";
export default {
  name: "Home",
  data() {
    return {
      overly_id: "",
      message: {},
    };
  },
  computed: {
    ...mapState("product", ["products"]),
  },

  created() {
    this.Data();
  },

  methods: {
    ...mapActions("product", ["Data"]),
    img(gallery) {
      return gallery[0].image_url?.cart_thumb;
    },
    overly(id) {
      console.log(id);
      this.overly_id = id;
    },
    overlyout(id) {
      if (this.overly_id === id) {
        this.overly_id = "";
      }
    },
    removeProduct(id) {
      if (confirm("Are you sure?")) {
        this.$store
          .dispatch("product/Delete", id)
          .then((res) => {
            this.message = res.data.message;
          })
          .catch(() => {});
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
.remove,  .add {
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
.overly  .quantity-div {
    
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
.add:hover,  .remove:hover {
    color: #fdd670;
    border-color: #fdd670;
}

</style>
