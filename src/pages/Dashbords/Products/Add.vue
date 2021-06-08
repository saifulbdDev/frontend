<template>
  <v-form ref="form" v-model="valid" lazy-validation class="mt-5">
    <h4>Add New Product</h4>
    <v-row>
      <v-col md="6" cols="12">
        <v-card class="pa-2">
          <v-text-field v-model="title" height="40" :rules="nameRules" label="Title" required></v-text-field>
          <v-select
            v-model="select"
            :items="items"
            :rules="[v => !!v || 'Item is required']"
            label="Category"
            required
          ></v-select>

          <v-text-field :rules="emailRules" label="Product Code" required></v-text-field>
          <v-select
            v-model="select"
            :items="items"
            :rules="[v => !!v || 'Item is required']"
            label="Brand"
            required
          ></v-select>
          <v-select
            v-model="select"
            :items="items"
            :rules="[v => !!v || 'Item is required']"
            label="Brand"
            required
          ></v-select>
        </v-card>
      </v-col>
      <v-col md="6" cols="12">
        <v-card class="pa-2">
          <v-text-field :rules="emailRules" label="Price" required></v-text-field>

          <v-text-field :rules="emailRules" label="Amount " required></v-text-field>
          <v-textarea name="input-10-1" class="desc" label="Description"></v-textarea>
        </v-card>
      </v-col>
    </v-row>

    <v-btn color="primary" class="mr-4 mt-4" @click="reset">Submit</v-btn>
  </v-form>

  <!-- </v-card> -->
</template>
<script>
export default {
  data: () => ({
    valid: true,
    name: "",
    nameRules: [
      (v) => !!v || "Name is required",
      (v) => (v && v.length <= 10) || "Name must be less than 10 characters",
    ],
    email: "",
    emailRules: [
      (v) => !!v || "E-mail is required",
      (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
    ],
    select: null,
    items: ["Item 1", "Item 2", "Item 3", "Item 4"],
    checkbox: false,
  }),

  methods: {
    validate() {
      this.$refs.form.validate();
    },
    reset() {
      this.$refs.form.reset();
    },
    resetValidation() {
      this.$refs.form.resetValidation();
    },
  },
};
</script>