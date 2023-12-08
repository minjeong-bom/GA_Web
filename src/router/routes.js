import Posting from "pages/Posting.vue";
import Article from "pages/article.vue";
import Login from "pages/JOI/Login.vue";

const routes = [
  {
    path: '/',
    component: () => import('layouts/HomeLayout.vue'),
    children: [
      { path: '/', component: () => import('pages/Home.vue') },
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/posting',
    name: 'posting',
    component: Posting
  },
  {
    path: '/article',
    name: 'article',
    component: Article
  },
  {
    path: '/onb',
    component: () => import('layouts/FullPageLayout.vue'),
    children: [
      { path: '/onb0000', component: () => import('pages/ONB/ONB_0000.vue') },
      { path: '/onb0001', component: () => import('pages/ONB/ONB_0001.vue') },
      { path: '/onb0002', component: () => import('pages/ONB/ONB_0002.vue') },
      { path: '/onb0003', component: () => import('pages/ONB/ONB_0003.vue') },
      { path: '/onb0004', component: () => import('pages/ONB/ONB_0004.vue') },
    ]
  },
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  },
]

export default routes
