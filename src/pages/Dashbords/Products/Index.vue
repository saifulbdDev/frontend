<template>
  <v-container fluid>
    <div class="tables-basic">
      <v-card class="mb-1 mt-3">
        <v-data-table :headers="headers" :items="products" sort-by="calories" class="elevation-1">
          <template v-slot:top>
            <v-toolbar flat>
              <v-toolbar-title>Products</v-toolbar-title>
              <v-divider class="mx-4" inset vertical></v-divider>
              <v-spacer></v-spacer>
              <v-btn color="primary" dark class="mb-2" to="/dashboard/products-create">New Products</v-btn>
            </v-toolbar>
          </template>
          <template v-slot:body="{ items }">
            <tbody>
              <tr v-for="item in items" :key="item.id">
                <td>{{ item.title }}</td>

                <td>
                  <img
                    class="mr-2"
                    width="60"
                    :src="img.image_url.cart_thumb"
                    v-for="img in item.gallery"
                    :key="img.id"
                  />
                </td>
                <td>{{ item.price }}</td>
                <td>{{ item.product_code }}</td>
                <td>{{ item.brand.title }}</td>
                <td>{{ item.category.title }}</td>
                <td>{{ item.user.name }}</td>

                <td>
                  <v-btn
                    color="primary"
                    small
                    class="mr-2"
                    link
                    :to="'/dashboard/product-update/'+item.id"
                  >
                    <v-icon small>mdi-pencil</v-icon>
                  </v-btn>
                  <v-btn color="error" small class="mr-2">
                    <v-icon small @click="deleteItem(item)">mdi-delete</v-icon>
                  </v-btn>
                </td>
              </tr>
            </tbody>
          </template>

          <template v-slot:no-data>
            <v-btn color="primary" @click="Data">Reset</v-btn>
          </template>
        </v-data-table>
      </v-card>
    </div>
  </v-container>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  name: "Tables",
  data() {
    return {
      dialog: false,
      dialogDelete: false,

      headers: [
        {
          text: "Title",
          align: "start",
          sortable: false,
          value: "title",
        },
        { text: "Images", value: "images" },
        { text: "Price", value: "price" },
        { text: "Product Code", value: "product_code" },
        { text: "Brand", value: "brand.title" },
        { text: "Category", value: "category.title" },
        { text: "By", value: "user.name" },

        { text: "Actions", value: "actions", sortable: false },
      ],
      desserts: [],
      editedIndex: -1,
      editedItem: {
        name: "",
        calories: 0,
        fat: 0,
        carbs: 0,
        protein: 0,
      },
      defaultItem: {
        name: "",
        calories: 0,
        fat: 0,
        carbs: 0,
        protein: 0,
      },
    };
  },
  computed: {
    ...mapState("product", ["products"]),

    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
    },
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },

  created() {
    this.Data();
  },

  methods: {
    ...mapActions("product", ["Data"]),
    deleteItem(item) {
      this.editedIndex = this.desserts.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      this.desserts.splice(this.editedIndex, 1);
      this.closeDelete();
    },
  },
};
</script>

