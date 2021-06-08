<template>
  <v-footer class="px-0" color="transparent">
    <v-container class="pa-0">
      <v-row no-gutters class="pa-0">
        <div>
          <v-btn
            v-for="(link, linki) in links"
            :key="'link'+linki"
            color="primary"
            text
            :href="link.link"
            class="text-capitalize ml-1 font-weight-regular"
          >{{ link.text }}</v-btn>
        </div>
        <div>
          <v-btn
            v-for="icon in icons"
            :key="icon.icon"
            :href="icon.link"
            class="mr-1"
            :color="config.light.textColor"
            icon
          >
            <v-icon size="24px">{{ icon.icon }}</v-icon>
          </v-btn>
        </div>
      </v-row>
    </v-container>
  </v-footer>
</template>

<script>
import config from "@/config";

export default {
  name: "Footer",

  data: () => ({
    config,
    icons: [
      { icon: "mdi-twitter", link: "" },
      { icon: "mdi-github", link: "" },
    ],
    links: [
      { text: "About Us", link: "" },
      { text: "Blog", link: "" },
    ],
  }),
};
</script>

<style src="./Footer.scss" lang="scss" scoped />
