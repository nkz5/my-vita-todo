import { createRouter, createWebHistory } from 'vue-router';

import MainTodo from '/src/pages/MainToDo.vue';
import About from '/src/pages/About.vue';
import NotFound from '/src/pages/NotFound.vue';

const routes = [
  {
    path: '/',
    name: 'Top',
    component: MainTodo,
  },
  {
    path: '/mainTodo',
    name: 'MainTodo',
    component: MainTodo,
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('/src/pages/About.vue'),
  },
  {
    path: '/blog/:id',
    name: 'BlogId',
    component: () => import('/src/pages/Blog.vue'),
  },
  {
    path: '/blog',
    name: 'Blog',
    component: () => import('/src/pages/Blog.vue'),
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFound,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
