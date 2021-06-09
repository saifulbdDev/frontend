<template>
  <v-form ref="form" v-model="valid" lazy-validation class="mt-5">
    <h4>Add New Product</h4>
    <v-row>
      <v-col md="6" cols="12">
        <v-card class="pa-2">
          <v-text-field
            v-model="product.title"
            :error-messages="errors.title"
            height="40"
            label="Title"
            required
          ></v-text-field>
          <v-select
            v-model="product.category_id"
            :error-messages="errors.category_id"
            :items="categories"
            item-text="title"
            item-value="id"
            label="Category"
            required
          ></v-select>

          <v-text-field
            v-model="product.product_code"
            :error-messages="errors.product_code"
            label="Product Code"
            required
          ></v-text-field>
          <v-select
            v-model="product.brand_id"
            :error-messages="errors.brand_id"
            :items="brands"
            item-text="title"
            item-value="id"
            label="Brand"
            required
          ></v-select>
          <v-select
            v-model="product.featured"
            :error-messages="errors.featured"
            :items="is_Featureds"
            item-text="text"
            item-value="value"
            label="Display options"
            required
          ></v-select>
        </v-card>
      </v-col>
      <v-col md="6" cols="12">
        <v-card class="pa-2">
          <v-text-field
            label="Price"
            required
            type="number"
            v-model="product.price"
            :error-messages="errors.price"
          ></v-text-field>

          <v-text-field
            label="Amount "
            type="number"
            v-model="product.amount"
            required
            :error-messages="errors.amount"
          ></v-text-field>
          <v-textarea
            name="input-10-1"
            v-model="product.description"
            class="desc"
            label="Description"
            :error-messages="errors.description"
          ></v-textarea>
          <v-file-input
            multiple
            v-model="files"
            required
            :error-messages="errors.image"
            label="Product Photos (Select multiple images)"
          ></v-file-input>
        </v-card>
      </v-col>
      <v-col md="12" cols="12">
        <v-card class="pa-2">
          <v-card-title>Discount details</v-card-title>
          <v-row>
            <v-col md="4" cols="12">
              <v-text-field
                label="Discount "
                :error-messages="errors.title"
                v-model="product.discount"
                required
                type="number"
              ></v-text-field>
            </v-col>
            <v-col md="4" cols="12">
              <v-menu
                ref="menu"
                v-model="menu"
                :close-on-content-click="false"
                :return-value.sync="product.discount_start_date"
                transition="scale-transition"
                offset-y
                min-width="auto"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="product.discount_start_date"
                    label="Discount start date"
                    prepend-icon="mdi-calendar"
                    :error-messages="errors.title"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker v-model="product.discount_start_date" no-title scrollable>
                  <v-spacer></v-spacer>
                  <v-btn text color="primary" @click="menu = false">Cancel</v-btn>
                  <v-btn
                    text
                    color="primary"
                    @click="$refs.menu.save(product.discount_start_date)"
                  >OK</v-btn>
                </v-date-picker>
              </v-menu>
            </v-col>
            <v-col md="4" cols="12">
              <v-menu
                ref="menu1"
                v-model="menu1"
                :close-on-content-click="false"
                :return-value.sync="product.discount_end_date"
                transition="scale-transition"
                offset-y
                min-width="auto"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="product.discount_end_date"
                    label="Discount end date"
                    :error-messages="errors.discount_end_date"
                    prepend-icon="mdi-calendar"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker v-model="product.discount_end_date" no-title scrollable>
                  <v-spacer></v-spacer>
                  <v-btn text color="primary" @click="menu1 = false">Cancel</v-btn>
                  <v-btn
                    text
                    color="primary"
                    @click="$refs.menu1.save(product.discount_end_date)"
                  >OK</v-btn>
                </v-date-picker>
              </v-menu>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>

    <v-btn
      color="primary"
      class="mr-4 mt-4"
      @click="save"
      :loading="loading"
      :disabled="loading"
    >Submit</v-btn>
  </v-form>

  <!-- </v-card> -->
</template>
<script>
import { mapActions, mapState } from "vuex";
export default {
  data: () => ({
    errors: [],
    valid: true,
    loader: null,
    loading: false,
    menu: false,
    menu1: false,
    is_Featureds: [
      { value: 0, text: "No" },
      { value: 1, text: "Yes" },
    ],
    product: {
      title: "",
      description: "",
      price: "",
      amount: "",
      discount: "",
      discount_start_date: "",
      discount_end_date: "",
      category_id: "",
      product_code: "",
      brand_id: "",
      featured: 0,
    },
    features: [],
    files: [],
  }),
  created() {
    this.Data();
    this.BrandData();
  },
  computed: {
    ...mapState("category", ["categories"]),
    ...mapState("brand", ["brands"]),
  },
  methods: {
    ...mapActions("category", ["Data"]),
    ...mapActions("brand", ["BrandData"]),
    save() {
      this.loading = true;
      const dataToSend = {};
      dataToSend.product = this.product;
      dataToSend.features = this.features;
      dataToSend.files = this.files;
      this.$store
        .dispatch("product/Created", this.toFormData(dataToSend))
        .then(() => {
          this.loading = false;

          this.$router.push("/dashboard/product");
        })
        .catch((err) => {
          this.errors = err.response.data.errors;
          console.log(err.response.data.errors);
          this.loading = false;
        });
    },
    toFormData(payload) {
      const formData = new FormData();
      for (let field in payload.product) {
        formData.append(field, payload.product[field]);
      }
      for (let i = 0; i < payload.features.length; i++) {
        formData.append(
          "features[" + payload.features[i].field_id + "]",
          payload.features[i].field_value
        );
      }
      for (let i = 0; i < payload.files.length; i++) {
        formData.append("image[" + i + "]", payload.files[i]);
      }

      return formData;
    },
    reset() {
      this.$refs.form.reset();
    },
  },
};
</script>