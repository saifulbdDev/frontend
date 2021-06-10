<template>
  <v-container fluid>
    <div class="tables-basic">
      <v-card class="mb-1 mt-3">
        <v-data-table :headers="headers" :items="categories" sort-by="calories" class="elevation-1">
          <template v-slot:top>
            <v-toolbar flat>
              <v-toolbar-title>Categories</v-toolbar-title>
              <v-divider class="mx-4" inset vertical></v-divider>
              <v-spacer>
                <v-col md="6" class="mx-auto" v-if="message == 'Deleted successfully'">
                  <v-alert type="success">{{message}}</v-alert>
                </v-col>
              </v-spacer>
              <v-btn color="primary" dark class="mb-2" to="/dashboard/category-create">New Category</v-btn>
            </v-toolbar>
          </template>
          <template v-slot:body="{ items }">
            <tbody>
              <tr v-for="item in items" :key="item.name">
                <td>{{ item.title }}</td>
                <td v-if="item.parent == null">None</td>
                <td v-else>{{ item.parent.title }}</td>
                <td>{{ item.featured == 1 ? 'Yes' : 'No' }}</td>
                <td>{{ $moment(item.created_at).format('MMMM Do YYYY, h:mm:ss A') }}</td>

                <td>{{ $moment(item.updated_at).format('MMMM Do YYYY, h:mm:ss A') }}</td>
                <td>
                  <v-btn
                    color="primary"
                    small
                    class="mr-2"
                    link
                    :to="'/dashboard/category-update/'+item.id"
                  >
                    <v-icon small>mdi-pencil</v-icon>
                  </v-btn>
                  <v-btn color="error" small class="mr-2" @click="removeCategory(item.id)">
                    <v-icon small>mdi-delete</v-icon>
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
      message: {},
      headers: [
        {
          text: "Title",
          align: "start",
          sortable: false,
          value: "title",
        },
        { text: "Parent", value: "parent" },
        { text: "Featured", value: "featured" },
        { text: "Created Date", value: "created_at" },
        { text: "Updated Date", value: "updated_at" },

        { text: "Actions", value: "actions", sortable: false },
      ],
    };
  },
  computed: {
    ...mapState("category", ["categories"]),
  },

  created() {
    this.Data();
  },

  methods: {
    ...mapActions("category", ["Data"]),

    removeCategory(id) {
      if (confirm("Are you sure?")) {
        this.$store
          .dispatch("category/Delete", id)
          .then((res) => {
            this.message = res.data.message;
            this.Data();
          })
          .catch(() => {});
      }
    },
  },
};
</script>

