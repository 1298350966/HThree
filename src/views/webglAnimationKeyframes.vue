<template>
  <div id="webgl-container" ref="webglContainerRef"></div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import HThree from "../utils/HThree";
const webglContainerRef = ref<HTMLElement | null>(null);
let HThreeInstance: HThree;

const options = {
  scene:{
    background:"#bfe3dd",
    environment:{
      scene:"RoomEnvironment"
    }
  },
  camera:{
    position:[5, 2, 8]
  },
  objects: [
    {
      type: "GLTFMesh",
      options: {
        path: "models/gltf/LittlestTokyo.glb",
        decoderPath: "jsm/libs/draco/gltf/",
        mixer: {
          isplay: true,
        },
      },
      position: [1, 1, 0],
      scale: [0.01, 0.01, 0.01],
    },
  ],
};
onMounted(() => {
  if (!webglContainerRef.value) return;
  HThreeInstance = new HThree(webglContainerRef.value, options);
  console.log(HThreeInstance);
});
</script>

<style scoped>
#webgl-container {
  width: 100%;
  height: 100%;
}
</style>
