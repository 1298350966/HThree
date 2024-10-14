<template>
  <div id="webgl-container" ref="webglContainerRef"></div>
</template>

<script setup lang="ts">
import { GUI } from "three/examples/jsm/libs/lil-gui.module.min.js";
import { ref, onMounted, onUnmounted } from "vue";
import HThree from "../utils/HThree";
let HThreeInstance, panel;
const webglContainerRef = ref<HTMLElement | null>(null);
const options = {
  camera: {
    position: [-5, 3, 10],
    lookAt: [0, 2, 0],
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
        path: "models/gltf/RobotExpressive/RobotExpressive.glb",
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
  HThreeInstance.on("onLoad", () => {
    createPanel();
  });
});
onUnmounted(() => {
  panel && panel.destroy();
});
function createPanel() {
  const model = HThreeInstance.getObjectName("Soldier");
  const { meshAnimation } = model;
  const settings = {};
  //    parent: t,
  //     autoPlace: i = void 0 === t,
  //     container: e,
  //     width: s,
  //     title: n = "Controls",
  panel = new GUI({
    width: 310,
    title: "模型",
  });
  console.log(panel);
  const folder4 = panel.addFolder("动作");
  meshAnimation.clipActions.forEach((action, index) => {
    let key = "动画" + index;
    settings[key] = function () {
      const { clipActions } = meshAnimation;
      meshAnimation.selectClipAction(clipActions[index]);
    };
    folder4.add(settings, key);
  });
}
</script>

<style scoped>
#webgl-container {
  width: 100%;
  height: 100%;
}
</style>
