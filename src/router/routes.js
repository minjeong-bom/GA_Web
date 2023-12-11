import Posting from "pages/Posting.vue";
import Article from "pages/Article.vue";
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
    path: '/hom',
    component: () => import('layouts/FullPageLayout.vue'),
    children: [
      { path: '/hom0111', component: () => import('pages/HOM/HOM_0111.vue') },
      { path: '/menu', component: () => import('pages/Menu.vue') },
    ]
  },
  {
    path: '/ser',
    component: () => import('layouts/FullPageLayout.vue'),
    children: [
      { path: '/ser0000', component: () => import('pages/SER/SER_0000.vue') },
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
    path: '/not',
    component: () => import('layouts/FullPageLayout.vue'),
    children: [
      { path: '/not0000', component: () => import('pages/NOT/NOT_0000.vue') },
      { path: '/not0100', component: () => import('pages/NOT/NOT_0100.vue') },
    ]
  },
  {
    path: '/eve',
    component: () => import('layouts/FullPageLayout.vue'),
    children: [
      { path: '/eve0000', component: () => import('pages/EVE/EVE_0000.vue') },
      { path: '/eve0100', component: () => import('pages/EVE/EVE_0100.vue') },
    ]
  },
  {
    path: '/joi',
    component: () => import('layouts/FullPageLayout.vue'),
    children: [
      { path: '/joi0000', component: () => import('pages/JOI/JOI_0000.vue') },
      { path: '/joi5000', component: () => import('pages/JOI/JOI_5000.vue') },
      { path: '/joi0100', component: () => import('pages/JOI/JOI_0100.vue') }, // 아이디, 비번 설정
      { path: '/joi0110', component: () => import('pages/JOI/JOI_0110.vue') }, // 이메일 설정
      { path: '/joi0140', component: () => import('pages/JOI/JOI_0140.vue') }, // 약관 동의
      { path: '/joi0150', component: () => import('pages/JOI/JOI_0150.vue') }, // 가입 완료
      { path: '/joi0160', component: () => import('pages/JOI/JOI_0160.vue') }, // 가입 완료
      { path: '/joi0170', component: () => import('pages/JOI/JOI_0170.vue') }, // 가입 완료
      { path: '/joi0180', component: () => import('pages/JOI/JOI_0180.vue') }, // 가입 완료
    ]
  },
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  },
]

export default routes
