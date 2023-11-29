import Posting from "pages/Posting.vue";

const routes = [
  {
    path: '/',
    component: () => import('layouts/HomeLayout.vue'),
    children: [
      { path: '/', component: () => import('pages/Home.vue') },
    ]
  },
  {
    path: '/posting',
    name: 'posting',
    component: Posting,
  },
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  },
]

export default routes
