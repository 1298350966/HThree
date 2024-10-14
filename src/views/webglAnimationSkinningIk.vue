<template>
  <div id="webgl-container" ref="webglContainerRef"></div>
</template>

<script setup lang="ts">
import { nextTick, onMounted, ref } from "vue";
import HThree from "../utils/HThree";
import { GUI } from "three/examples/jsm/libs/lil-gui.module.min.js";
import { Object3D } from "three";
import { Object3DEventMap } from "three";
const webglContainerRef = ref<HTMLElement | null>(null);
let HThreeInstance: HThree;
let model: Object3D<Object3DEventMap> | undefined, settings;
let clipAction;
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
        path: "models/gltf/kira.glb",
        decoderPath: "jsm/libs/draco/gltf/",
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
});


</script>

<style scoped>
#webgl-container {
  width: 100%;
  height: 100%;
}
</style>
