import { createRouter, createWebHistory } from 'vue-router'
import { useFavoritesStore } from "../stores/favorites"

const Home = () => import('../pages/Home.vue')
const Favorites = () => import('../pages/Favorites.vue')

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'home', component: Home },
    {
      path: "/movie/:id",
      component: () => import("../pages/movie/MovieLayout.vue"),
      children: [
        {
          path: "",
          component: () => import("../pages/movie/MovieOverview.vue"),
        },
        {
          path: "cast",
          component: () => import("../pages/movie/MovieCast.vue"),
        },
      ],
    },
    { path: '/favorites', name: 'favorites', component: Favorites },
    { path: "/feedback", name: "feedback", component: () => import("../pages/Feedback.vue")},
    { path: "/:pathMatch(.*)*", component: () => import("../pages/NotFound.vue")}
  ],
  scrollBehavior() {
    return { top: 0 }
  }
})

router.beforeEach((to) => {
  if (to.path === "/favorites") {
    const favorites = useFavoritesStore()
    if (favorites.count === 0) return "/"
  }
})

export default router
