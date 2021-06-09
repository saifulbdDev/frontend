
<template>
  <v-form ref="form" v-model="valid" lazy-validation class="mt-5">
    <h2>Update {{category.title}}</h2>
    <v-row>
      <v-col md="6" cols="12">
        <v-card class="pa-2">
          <v-text-field v-model="category.title" height="40" label="Title" required></v-text-field>
          <v-select
            v-model="category.parent_id"
            :items="categories"
            item-text="title"
            item-value="value"
            label="Parent Category"
            required
          ></v-select>
          <v-select
            v-model="category.featured"
            :items="is_Featureds"
            item-text="text"
            item-value="value"
            label="Is Featured"
            required
          ></v-select>
          <v-textarea class="desc" v-model="category.description" label="Description"></v-textarea>
        </v-card>
      </v-col>
      <v-col md="6" cols="12">
        <v-card class="pa-2">
          <v-toolbar color="primary" height="40" dark flat>
            <v-toolbar-title>Features</v-toolbar-title>

            <v-spacer></v-spacer>

            <v-btn color="white" text @click="addNewFeature">Add new Feature</v-btn>
          </v-toolbar>
          <v-card-text>
            <v-row v-for="featured_items in category.features" :key="featured_items.id">
              <v-col md="5">
                <v-text-field
                  v-model="featured_items.field_title"
                  height="40"
                  label="Feature title"
                  required
                ></v-text-field>
              </v-col>
              <v-col md="5">
                <v-select
                  v-model="featured_items.field_type"
                  :items="text_colors"
                  item-text="text"
                  item-value="value"
                  :rules="[(v) => !!v || 'Item is required']"
                  required
                ></v-select>
              </v-col>
              <v-col md="2">
                <v-btn @click="removeFeature(featured_items.id)" small color="primary">
                  <v-icon dark>mdi-minus</v-icon>
                </v-btn>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-btn
      color="primary"
      class="mr-4 mt-4"
      @click="Update"
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
    valid: true,
    title: "",
    parent_id: "",
    description: "",
    featured: 0,
    is_Featureds: [
      { value: 0, text: "No" },
      { value: 1, text: "Yes" },
    ],
    text_colors: [
      { value: 2, text: "color" },
      { value: 1, text: "text" },
    ],
    emailRules: [
      (v) => !!v || "E-mail is required",
      (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
    ],
    select: null,
    loader: null,
    loading: false,
    featured_lists: [],
    checkbox: false,
  }),
  created() {
    this.ShowCategory();
    this.Data();
  },
  computed: {
    ...mapState("category", ["categories", "category"]),
  },
  methods: {
    ...mapActions("category", ["Data"]),

    ShowCategory() {
      let id = this.$route.params.id;
      console.log(id);
      this.$store.dispatch("category/Show", id).then(() => {});
    },
    addNewFeature() {
      let obj = {
        id: Math.floor(Math.random() * 1000),
        field_title: "",
        field_type: 1,
        category_id: "",
      };
      this.category.features.push(obj);
    },
    removeFeature(id) {
      this.category.features = [
        ...this.category.features.filter((item) => item.id !== id),
      ];
    },

    Update() {
      this.loading = true;
      let data = {
        title: this.category.title,
        parent_id: this.category.parent_id,
        description: this.category.description,
        featured: this.category.featured,
        features: this.category.features,
      };
      let Update = {
        data,
        id: this.category.id,
      };

      this.$store
        .dispatch("category/Update", Update)
        .then(() => {
          this.loading = false;

          this.$router.push("/dashboard/categories");
        })
        .catch(() => {
          this.loading = false;
        });
    },
    reset() {
      this.$refs.form.reset();
    },
  },
};
</script>
