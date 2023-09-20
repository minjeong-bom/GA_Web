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
    ]
  },

  {
    path: '/service-comment',
    component: () => import('layouts/SimpleLayout.vue'),
    children: [
      { path: '/service-comment/step1', component: () => import('pages/serviceComment/step1.vue') },
      { path: '/service-comment/step2', component: () => import('pages/serviceComment/step2.vue') },
      { path: '/service-comment/step3', component: () => import('pages/serviceComment/step3.vue') },
      { path: '/service-comment/step4', component: () => import('pages/serviceComment/step4.vue') },
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
