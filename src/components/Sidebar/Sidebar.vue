/* eslint-disable vue/valid-v-bind */
<template>
  <v-navigation-drawer
    app
    clipped
    v-model="DRAWER_STATE"
    :mini-variant="!DRAWER_STATE"
    :width="sidebarWidth"
    :permanent="$vuetify.breakpoint.mdAndUp"
    :temporary="$vuetify.breakpoint.smAndDown"
    :mini-variant-width="sidebarMinWidth"
    :class="{'drawer-mini': !DRAWER_STATE}"
  >
    <v-list>
      <template v-for="(head, i) in items">
        <v-list-item color="primary" v-if="head.heading" :key="'head_'+i" link>
          <v-list-item-content>
            <v-list-item-title class="text" link>
              <span :class="(head.heading && DRAWER_STATE) ? 'show ' : 'hide'">{{ head.heading }}</span>
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </template>
      <v-divider dark class="my-4"></v-divider>
      <template v-for="(item, i) in categories_menu">
        <v-list-group
          color="primary"
          v-if="item.children.length && DRAWER_STATE"
          :key="i"
          v-model="item.model"
          append-icon="mdi-chevron-right"
        >
          <template v-slot:activator>
            <v-list-item-action v-if="item.title == 'Baby Care'">
              <img :src="babycare" />
            </v-list-item-action>

            <v-list-item-content>
              <v-list-item-title class="text">{{ item.title }}</v-list-item-title>
            </v-list-item-content>
          </template>
          <v-list-item
            v-for="(child, i) in item.children"
            :key="i"
            :to="'/product-category'+child.path"
            @click="CategoryByProduct(child)"
            link
          >
            <v-list-item-action v-if="child.icon">
              <v-icon size>{{ child.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title class="text">{{ child.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-group>
        <v-list-item
          color="primary"
          v-else
          :key="item.text"
          :to="'/product-category'+item.path"
          @click="CategoryByProduct(item)"
          link
        >
          <v-list-item-action v-if="item.title == 'Popular'">
            <img :src="popular" />
          </v-list-item-action>
          <v-list-item-action v-if="item.title == 'Hygiene'">
            <img :src="hygiene" />
          </v-list-item-action>
          <v-list-item-action v-if="item.title == 'Summer Collection'">
            <img :src="summercollection" />
          </v-list-item-action>
          <v-list-item-action v-if="item.title == 'Flash Sales '">
            <img :src="flashsales" />
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title class="text" link>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </template>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import popular from "@/assets/img/popular.png";
import flashsales from "@/assets/img/flash-sales.png";
import hygiene from "@/assets/img/hygiene.png";
import summercollection from "@/assets/img/summer-collection.png";
import babycare from "@/assets/img/baby-care.png";
import { mapActions, mapState } from "vuex";
import menus from "./manu";
export default {
  props: {
    source: String,
  },
  data() {
    return {
      babycare: babycare,
      popular: popular,
      flashsales: flashsales,
      hygiene: hygiene,
      summercollection: summercollection,
      items: menus.items,
      sidebarWidth: 220,
      sidebarMinWidth: 0,
    };
  },
  created() {
    this.DataMenu();
  },
  computed: {
    ...mapState("layout", ["drawer"]),

    ...mapState("category", ["categories_menu"]),

    DRAWER_STATE: {
      get() {
        return this.drawer;
      },
      set(newValue) {
        if (newValue === this.drawer) return;
        this.TOGGLE_DRAWER();
      },
    },
  },
  methods: {
    ...mapActions("layout", ["TOGGLE_DRAWER"]),
    ...mapActions("category", ["DataMenu"]),

    CategoryByProduct(item) {
      var matches = item.path.replace(/\D/g, "");

      this.$store
        .dispatch("product/DataSearch", matches)
        .then((res) => {
          this.$router.push(`/product-category/+${matches}`);

          console.log(res);
        })
        .catch(() => {});
    },
  },
};
</script>

<style src="./Sidebar.scss" lang="scss"/>
