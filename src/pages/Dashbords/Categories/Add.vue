<template>
  <v-form ref="form" v-model="valid" lazy-validation class="mt-5">
    <h2>Add New Category</h2>
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
          <v-select
            v-model="select"
            :items="items"
            :rules="[v => !!v || 'Item is required']"
            label="Category"
            required
          ></v-select>
          <v-textarea class="desc" label="Description"></v-textarea>
        </v-card>
      </v-col>
      <v-col md="6" cols="12">
        <v-card class="pa-2">
          <v-toolbar color="primary" height="40" dark flat>
            <v-toolbar-title>Features</v-toolbar-title>

            <v-spacer></v-spacer>

            <v-btn color="white" text>Add new Feature</v-btn>
          </v-toolbar>
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