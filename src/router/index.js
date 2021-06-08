import Vue from "vue";
import Router from "vue-router";

import Layout from "@/components/Layout/Layout";
import DashboardLayout from "@/components/Dashboard/Layout/Layout";
import SingleProduct from "../pages/SingleProduct";
import DashbdProduct from "../pages/Dashbords/Products/Index.vue";
import DashbdProductAdd from "../pages/Dashbords/Products/Add.vue";
import DashbdProductUpdate from "../pages/Dashbords/Products/Update.vue";
import Categories from "../pages/Dashbords/Categories/Index.vue";
import CategoryAdd from "../pages/Dashbords/Categories/Add.vue";
import CategoryUpdate from "../pages/Dashbords/Categories/Update.vue";
import Brands from "../pages/Dashbords/Brands/Index.vue";
import BrandAdd from "../pages/Dashbords/Brands/Add.vue";
import BrandUpdate from "../pages/Dashbords/Brands/Update.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      redirect: "home",
    },
    {
      path: "/home",
      name: "Home",
      component: Layout,
      children: [
        {
          meta: { title: "SingleProduct" },
          path: "/product/:name",
          name: "Home",
          component: SingleProduct,
        },
      ],
    },
    {
      path: "/dashboard",
      name: "Dashboard",
      component: DashboardLayout,
      children: [
        {
          meta: { title: "Product" },
          path: "/dashboard/products",
          name: "Home",
          component: DashbdProduct,
        },
        {
          meta: { title: "Product Add" },
          path: "/dashboard/product-add",
          name: "Home",
          component: DashbdProductAdd,
        },
        {
          meta: { title: "Product Update" },
          path: "/dashboard/product-update:/id",
          name: "Home",
          component: DashbdProductUpdate,
        },
        {
          meta: { title: "Categories" },
          path: "/dashboard/Categories",
          name: "Home",
          component: Categories,
        },
        {
          meta: { title: "Category Add" },
          path: "/dashboard/category-create",
          name: "Home",
          component: CategoryAdd,
        },
        {
          meta: { title: "Category Update" },
          path: "/dashboard/category-update:/id",
          name: "Home",
          component: CategoryUpdate,
        },
        {
          meta: { title: "Brands" },
          path: "/dashboard/brands",
          name: "Home",
          component: Brands,
        },
        {
          meta: { title: "Brand Add" },
          path: "/dashboard/brand-create",
          name: "Home",
          component: BrandAdd,
        },
        {
          meta: { title: "Brand Update" },
          path: "/dashboard/brand-update:/id",
          name: "Home",
          component: BrandUpdate,
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
