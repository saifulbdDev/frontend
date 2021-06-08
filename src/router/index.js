import Vue from "vue";
import Router from "vue-router";

import Layout from "@/components/Layout/Layout";
import Login from "@/pages/Login";
import DashboardLayout from "@/components/Dashboard/Layout/Layout";
import SingleProduct from "@/pages/SingleProduct";
import DashbdProduct from "@/pages/Dashbords/Products/Index.vue";
import DashbdProductAdd from "@/pages/Dashbords/Products/Add.vue";
import DashbdProductUpdate from "@/pages/Dashbords/Products/Update.vue";
import Categories from "@/pages/Dashbords/Categories/Index.vue";
import CategoryAdd from "@/pages/Dashbords/Categories/Add.vue";
import CategoryUpdate from "@/pages/Dashbords/Categories/Update.vue";
import Brands from "@/pages/Dashbords/Brands/Index.vue";
import BrandAdd from "@/pages/Dashbords/Brands/Add.vue";
import BrandUpdate from "@/pages/Dashbords/Brands/Update.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      redirect: "home",
    },
    {
      path: "/login",  
      name: "Login",   
      component: Login, 
    },
    {
      path: "/home",
    
      component: Layout,
      children: [
        {
          meta: { title: "SingleProduct" },
          path: "/product/:name",
        
          component: SingleProduct,
        },
      ],
    },
    {
      path: "/dashboard",
      name: "Dashboard",
      component: DashboardLayout,
      redirect: "/dashboard/products",
      children: [
        {
          meta: { title: "Product" },
          path: "/dashboard/products",
        
          component: DashbdProduct,
        },
        {
          meta: { title: "Product Add" },
          path: "/dashboard/product-add",
        
          component: DashbdProductAdd,
        },
        {
          meta: { title: "Product Update" },
          path: "/dashboard/product-update:/id",
        
          component: DashbdProductUpdate,
        },
        {
          meta: { title: "Categories" },
          path: "/dashboard/Categories",
        
          component: Categories,
        },
        {
          meta: { title: "Category Add" },
          path: "/dashboard/category-create",
        
          component: CategoryAdd,
        },
        {
          meta: { title: "Category Update" },
          path: "/dashboard/category-update:/id",
        
          component: CategoryUpdate,
        },
        {
          meta: { title: "Brands" },
          path: "/dashboard/brands",
        
          component: Brands,
        },
        {
          meta: { title: "Brand Add" },
          path: "/dashboard/brand-create",
        
          component: BrandAdd,
        },
        {
          meta: { title: "Brand Update" },
          path: "/dashboard/brand-update:/id",
        
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
