const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Home.vue') }
    ]
  },

  {
    path: '/',
    component: () => import('layouts/SubLayout.vue'),
    children: [
      { path: '/article', component: () => import('pages/Article.vue') },
      { path: '/search', component: () => import('pages/Search.vue') },
      { path: '/alarms', component: () => import('pages/Alarms.vue') },
      { path: '/mypage', component: () => import('pages/MyPage.vue') },
    ]
  },

  {
    path: '/',
    component: () => import('layouts/SimpleLayout.vue'),
    children: [
      { path: '/posting', component: () => import('pages/Posting.vue') },
      { path: '/onboard', component: () => import('pages/Onboard.vue') },
      { path: '/service-comment/step1', component: () => import('pages/serviceComment/step1.vue') },
      { path: '/service-comment/step2', component: () => import('pages/serviceComment/step2.vue') },
      { path: '/service-comment/step3', component: () => import('pages/serviceComment/step3.vue') },
      { path: '/service-comment/step4', component: () => import('pages/serviceComment/step4.vue') },
    ]
  },

  // MTP
  {
    path: '/MYP',
    component: () => import('layouts/SimpleLayout.vue'),
    children: [
      { path: '/myp3000', component: () => import('pages/MYP/MYP3000.vue') },
    ]
  },

  // JOI
  {
    path: '/JOI',
    component: () => import('layouts/SimpleLayout.vue'),
    children: [
      { path: '/joi0140', component: () => import('pages/JOI/JOI0140.vue') },
      { path: '/joi0150', component: () => import('pages/JOI/JOI0150.vue') },
      { path: '/joi0160', component: () => import('pages/JOI/JOI0160.vue') },
      { path: '/login', component: () => import('pages/login/Login.vue') },
    ]
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  },
]

export default routes
