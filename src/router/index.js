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

let router = new Router({
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
      meta: {
        requiresAuth: true,
        is_admin: true,
      },
      redirect: "/dashboard/products",
      children: [
        {
          meta: { title: "Product", requiresAuth: true, is_admin: true },
          path: "/dashboard/products",

          component: DashbdProduct,
        },
        {
          meta: { title: "Product Add", requiresAuth: true, is_admin: true },
          path: "/dashboard/products-create",

          component: DashbdProductAdd,
        },
        {
          meta: { title: "Product Update", requiresAuth: true, is_admin: true },
          path: "/dashboard/product-update/:id",

          component: DashbdProductUpdate,
        },
        {
          meta: { title: "Categories", requiresAuth: true, is_admin: true },
          path: "/dashboard/Categories",

          component: Categories,
        },
        {
          meta: { title: "Category Add", requiresAuth: true, is_admin: true },
          path: "/dashboard/category-create",

          component: CategoryAdd,
        },
        {
          meta: {
            title: "Category Update",
            requiresAuth: true,
            is_admin: true,
          },
          path: "/dashboard/category-update/:id",

          component: CategoryUpdate,
        },
        {
          meta: { title: "Brands", requiresAuth: true, is_admin: true },
          path: "/dashboard/brands",

          component: Brands,
        },
        {
          meta: { title: "Brand Add", requiresAuth: true, is_admin: true },
          path: "/dashboard/brand-create",

          component: BrandAdd,
        },
        {
          meta: { title: "Brand Update", requiresAuth: true, is_admin: true },
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

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (localStorage.getItem("auth_token") == null) {
      next({
        path: "/login",
        params: { nextUrl: to.fullPath },
      });
    } else {
      let user = JSON.parse(localStorage.getItem("user_data"));
      if (to.matched.some((record) => record.meta.is_admin)) {
        if (user.is_super_admin == 1) {
          next();
        } else {
          next({ path: "/" });
        }
      } else {
        next();
      }
    }
  } else if (to.matched.some((record) => record.meta.guest)) {
    if (localStorage.getItem("auth_token") == null) {
      next();
    } else {
      next({ path: "/" });
    }
  } else {
    next();
  }
});

export default router;
