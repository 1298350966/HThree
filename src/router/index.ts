import { createRouter, createWebHistory } from "vue-router";

import webglAnimationKeyframes from "../views/webglAnimationKeyframes.vue";
import webglAnimationSkinningBlending from "../views/webglAnimationSkinningBlending.vue";
import webglAnimationSkinningAdditiveBlending from "../views/webglAnimationSkinningAdditiveBlending.vue";
import webglAnimationSkinningIk from "../views/webglAnimationSkinningIk.vue";

const routes = [
  { path: "/", redirect: "/webglAnimationSkinningBlending" },
  {
    path: "/webglAnimationKeyframes",
    component: webglAnimationKeyframes,
    meta: {
      name: "webglAnimationKeyframes",
    },
  },
  {
    path: "/webglAnimationSkinningBlending",
    component: webglAnimationSkinningBlending,
    meta: {
      name: "webglAnimationSkinningBlending",
    },
  },
  {
    path: "/webglAnimationSkinningAdditiveBlending",
    component: webglAnimationSkinningAdditiveBlending,
    meta: {
      name: "webglAnimationSkinningAdditiveBlending",
    },
  },
  {
    path: "/webglAnimationSkinningIk",
    component: webglAnimationSkinningIk,
    meta: {
      name: "webglAnimationSkinningIk",
    },
  },
  {
    path: "/webglAnimationSkinningMorph",
    component: () => import("../views/webglAnimationSkinningMorph.vue"),
    meta: {
      name: "webglAnimationSkinningMorph",
    },
  },
  {
    path: "/webglInteractiveVoxelpainter",
    component: () => import("../views/webglInteractiveVoxelpainter.vue"),
    meta: {
      name: "webglInteractiveVoxelpainter",
    },
  },
  ,
];

export const meuns = (() => {
  let list: { path: string; name: string }[] = [];
  routes.forEach((e) => {
    const { path, meta } = e;

    if (meta) {
      const { name } = meta;
      list.push({
        path,
        name,
      });
    }
  });
  return list;
})();

export default createRouter({
  history: createWebHistory(),
  routes,
});
