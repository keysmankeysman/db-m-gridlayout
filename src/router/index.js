import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/Login.vue';

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home-view',
    component: () => import('@/views/Dashboard/Dashboard.vue')
  },
  // Дашбоард
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import('@/views/Dashboard/Dashboard.vue')
  },
  // в реальном времени
  {
		path: "/report_categories/:id",
		name: "ReportCategories",
    component: () => import('@/views/Reports/ReportCategoriesDetails.vue')
	},
    // организация
  {
		path: "/organization",
		name: "Organization",
		component: () => import('@/views/Organization/Main.vue'),
	},
  // 
  {
		path: "/reports",
		name: "ReportsList",
		component: () => import('@/views/Reports/ReportList.vue'),
	},
  {
		path: '/login',
		name: 'Login',
		component: Login,
		meta: {
			isVisibleByDefault: true,
			isDisabledNavigation: true,
			pathName: "login",
		},
	},
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
