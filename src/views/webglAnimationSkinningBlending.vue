<template>
  <div id="webgl-container" ref="webglContainerRef"></div>
</template>

<script setup lang="ts">
import { nextTick, onMounted, ref, onUnmounted } from "vue";
import HThree from "../utils/HThree";
import { GUI } from "three/examples/jsm/libs/lil-gui.module.min.js";
import { Object3D } from "three";
import { Object3DEventMap } from "three";
const webglContainerRef = ref<HTMLElement | null>(null);
let HThreeInstance: HThree;
let model: Object3D<Object3DEventMap> | undefined, settings;
let clipAction, panel;
const options = {
  camera: {
    position: [1, 2, -3],
    lookAt: [0, 1, 0],
  },
  scene: {
    background: 0xa0a0a0,
    fog: {
      color: 0xa0a0a0,
      near: 10,
      far: 50,
    },
  },
  objects: [
    {
      name: "Soldier",
      type: "GLTFMesh",
      options: {
        path: "models/gltf/Soldier.glb",
        // decoderPath: "jsm/libs/draco/gltf/",
        mixer: {
          isplay: true,
        },
      },
      position: [0, 0, 0],
      // scale: [1, 1, 1],
    },
    {
      type: "PlaneMesh",
    },
  ],
  lights: [
    {
      type: "DirectionalLight",
      option: {
        color: "#ffffff",
        intensity: 3,
      },
      position: [0, 20, 0],
      castShadow: true,
      camera: {
        top: 2,
        bottom: -2,
        left: -2,
        right: 2,
        near: 0.1,
        far: 40,
      },
    },
    {
      type: "HemisphereLight",
      option: {
        skyColor: "#ffffff",
        groundColor: "#8d8d8d",
        intensity: 3,
      },
      position: [0, 20, 0],
    },
  ],
};
onMounted(() => {
  if (!webglContainerRef.value) return;
  HThreeInstance = new HThree(webglContainerRef.value, options);
  setTimeout(() => {
    model = HThreeInstance.getObjectName("Soldier");
    console.log(model);
  }, 1000);

  createPanel();
});
onUnmounted(() => {
  panel && panel.destroy();
});

function createPanel() {
  panel = new GUI({ width: 310 });
  console.log(panel);
  const folder1 = panel.addFolder("可见");
  const folder4 = panel.addFolder("Crossfading");
  settings = {
    显示模型: true,
    "show skeleton": false,
    // "deactivate all": deactivateAllActions,
    // "activate all": activateAllActions,
    // "pause/continue": pauseContinue,
    // "make single step": toSingleStepMode,
    "modify step size": 0.05,
    动画1: function () {
      const { meshAnimation } = model;
      if (!meshAnimation) return;
      const { clipActions } = meshAnimation;
      const idleAction = clipActions[0];
      const walkAction = clipActions[3];
      const runAction = clipActions[1];
      // meshAnimation.prepareCrossFade(walkAction, idleAction, 1.0);
      meshAnimation.selectClipAction(idleAction);
    },
    动画2: function () {
      const { meshAnimation } = model;
      if (!meshAnimation) return;
      const { clipActions } = meshAnimation;
      const idleAction = clipActions[0];
      const walkAction = clipActions[3];
      const runAction = clipActions[1];
      // meshAnimation.prepareCrossFade(idleAction, walkAction, 0.5);
      meshAnimation.selectClipAction(clipActions[2]);
    },
    动画3: function () {
      const { meshAnimation } = model;
      if (!meshAnimation) return;
      const { clipActions } = meshAnimation;
      const idleAction = clipActions[0];
      const walkAction = clipActions[3];
      const runAction = clipActions[1];
      // meshAnimation.prepareCrossFade(walkAction, runAction, 2.5);
      meshAnimation.selectClipAction(runAction);
    },
    动画4: function () {
      const { meshAnimation } = model;
      if (!meshAnimation) return;
      const { clipActions } = meshAnimation;
      const idleAction = clipActions[0];
      const walkAction = clipActions[3];
      const runAction = clipActions[1];
      // meshAnimation.prepareCrossFade(runAction, walkAction, 5.0);
      meshAnimation.selectClipAction(walkAction);
    },
    "use default duration": true,
    "set custom duration": 3.5,
    "modify idle weight": 0.0,
    "modify walk weight": 1.0,
    "modify run weight": 0.0,
    "modify time scale": 1.0,
  };
  folder1.add(settings, "显示模型").onChange(showModel);
  folder4.add(settings, "动画1");
  folder4.add(settings, "动画2");
  folder4.add(settings, "动画3");
  folder4.add(settings, "动画4");
}

function showModel(visibility: boolean) {
  console.log(model);
  if (!model) return;
  model.visible = visibility;
}

function prepareCrossFade(startAction, endAction, defaultDuration) {}
</script>

<style scoped>
#webgl-container {
  width: 100%;
  height: 100%;
}
</style>
