import Vue from "vue";
import Router from "vue-router";

import Layout from '@/components/Layout/Layout';
import SingleProduct from "../pages/SingleProduct";




Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
   
    {
      path: "/",
      name: "Home",
      component: Layout,
      children: [
        {
          meta: { title: "SingleProduct" },
          path: "/:name",
          name: "Home",
          component: SingleProduct,
        },
      
      ],
    },

    {
      path: "*",
      name: "Error",
      component: Error,
    },
  ],
});