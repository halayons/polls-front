const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("pages/Index.vue") },
      { path: "/listq", component: () => import("pages/ListQuestions.vue") },
      { path: "/encuesta2", component: () => import("pages/Encuesta2.vue") },
      { path: "/encuesta3", component: () => import("pages/Encuesta3.vue") },
      { path: "/polls", component: () => import("pages/Polls.vue") },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/Error404.vue"),
  },
];

export default routes;
