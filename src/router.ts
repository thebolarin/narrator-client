import Home from './views/HomeView.vue'
import About from './views/AboutView.vue'
import SingleProject from './views/SingleProjectView.vue'
import ProjectHistory from './views/ProjectHistoryView.vue'
import NotFound from './views/NotFound.vue'
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  { path: '/', component: Home, meta: { title: 'Home' }},
  { path: '/about', component: About, meta: { title: 'About' }},
  { path: '/project/:id/history', component: ProjectHistory, name:'ProjectHistory', meta: { title: 'ProjectHistory' }},
  { path: '/project/:id', component: SingleProject, name:'ProjectDetails', meta: { title: 'ProjectDetails' }},
  { path: '/:pathMatch(.*)*', component: NotFound, meta: { title: 'Page not found' }},
]

const router = createRouter({
  history: createWebHistory(),
  routes: import.meta.hot ? [] : routes,
})

let removeRoutes: any = []

if (import.meta.hot) {
 
  for (const route of routes) {
    removeRoutes.push(router.addRoute(route))
  }
}
if (import.meta.hot) {
  import.meta.hot?.accept('./router.ts', ({ routes }) => {
    for (const removeRoute of removeRoutes) removeRoute()
    removeRoutes = []
    for (const route of routes) {
      removeRoutes.push(router.addRoute(route))
    }
    router.replace('')
  })
}

export default router