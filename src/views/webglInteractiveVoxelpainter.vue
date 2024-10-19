<template>
  <div id="webgl-container" ref="webglContainerRef"></div>
</template>

<script setup lang="ts">
import { GUI } from "three/examples/jsm/libs/lil-gui.module.min.js";
import { ref, onMounted, onUnmounted } from "vue";
import HThree from "../utils/HThree";
import { GridHelper } from "three";
let HThreeInstance: HThree, panel;
const webglContainerRef = ref<HTMLElement | null>(null);
const options = {
  camera: {
    position: [500, 800, 1300],
    lookAt: [0, 0, 0],
  },
  scene: {
    background: 0xf0f0f0,
    fog: {
      color: 0xa0a0a0,
      near: 10,
      far: 50,
    },
  },
  objects: [
    {
      type: "PlaneMesh",
      geometry: [1000, 1000],
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
  HThreeInstance.on("onLoad", () => {
    const gridHelper = new GridHelper(1000, 20);
    HThreeInstance.scene.add(gridHelper);
  });
});
</script>

<style scoped>
#webgl-container {
  width: 100%;
  height: 100%;
}
</style>
