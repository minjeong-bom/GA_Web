import Posting from "pages/Posting.vue";
import Article from "pages/Article.vue";
import Login from "pages/JOI/Login.vue";
import Search from "pages/Search.vue";

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
    path: '/myp',
    component: () => import('layouts/FullPageLayout.vue'),
    children: [
      { path: '/myp0000', component: () => import('pages/MYP/MYP0000.vue') },
      { path: '/myp3000', component: () => import('pages/MYP/MYP3000.vue') }, // 북마크
      { path: '/myp4001', component: () => import('pages/MYP/MYP4001.vue') },
      { path: '/myp4100', component: () => import('pages/MYP/MYP4100.vue') },
      { path: '/myp4110', component: () => import('pages/MYP/MYP4110.vue') },
      { path: '/myp4120', component: () => import('pages/MYP/MYP4120.vue') },
      { path: '/myp4130', component: () => import('pages/MYP/MYP4130.vue') },
    ]
  },
  {
    path: '/myr',
    component: () => import('layouts/FullPageLayout.vue'),
    children: [
      { path: '/myr0000', component: () => import('pages/MYR/CreateMyResume.vue') },
      { path: '/myr2120', component: () => import('pages/MYR/MYR_2120.vue') },
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
    path: '/search',
    name: 'search',
    component: Search
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
      { path: '/joi4999', component: () => import('pages/JOI/JOI_4999.vue') },
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
    path: '/cus',
    component: () => import('layouts/ContentFooterLayout.vue'),
    children: [
      { path: '/cus0000', component: () => import('pages/CUS/CUS_0000.vue')}
    ]
  },
  // 본인인증 페이지
  {
    path: '/joi_5000',
    name: 'mok_std_request',
    component: () => import('../pages/auth/mok_vue_index.vue')
  },
  {
    path: '/redirect',
    name: 'mok_std_redirect',
    component: () => import('../pages/auth/mok_vue_redirect.vue')
  },
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  },
]

export default routes
