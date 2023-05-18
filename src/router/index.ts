import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import MagazineView from '../views/MagazineView.vue'
import MineView from '../views/MineView.vue'
import BankView from "@/views/BankView.vue"
import LoginView from "@/views/LoginView.vue"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: "/magazine",
      name: "magazine",
      component: MagazineView
    },
    {
      path: "/mine",
      name: "mine",
      meta: {
        isLogin: true
      },
      component: MineView
    },
    {
      path: "/bank",
      name: "bank",
      meta: {
        isLogin: true
      },
      component: BankView
    },
    {
      path: "/login",
      name: "login",
      component: LoginView
    },
    {
      path: "/details/:id/:year/:issue",
      name: "details",
      props: true,
      component: () => import("@/views/DetailsView.vue")
    },
    {
      path: "/search",
      name: "search",
      component: () => import("@/views/SearchView.vue")
    },
    {
      path: "/classification/:code/:index",
      name: "classification",
      props: true,
      component: () => import("@/views/ClassificationView.vue")
    },
    {
      path: "/articleDetail/:titleId",
      name: "articleDetail",
      props: true,
      component: () => import("@/views/ArticleDetailView.vue")
    }
  ]
})

router.beforeEach((to, from, next) => {

  const isLogin = window.localStorage.getItem('token');

  if (to.meta.isLogin) {

    if (isLogin) {
      next();
    } else {
      router.replace({ path: "/login", query: { s: to.fullPath } })
    }

  } else {
    next();
  }
})


export default router
