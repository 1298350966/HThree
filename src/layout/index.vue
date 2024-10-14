<template>
  <el-container class="h-layout w-full h-full">
    <el-aside width="280px">
      <el-menu default-active="2" class=" h-full" router>
        <el-menu-item
          :index="item.path"
          v-for="(item, index) in menuList"
          :key="index"
        >
          <span>{{ item.name }}</span>
        </el-menu-item>
      </el-menu>
    </el-aside>
    <el-main class="p-0 relative">
      <slot></slot>
    </el-main>
  </el-container>
</template>

<script setup lang="ts">
import { reactive } from "vue";
import { meuns } from "../router/index";
const menuList = reactive([...meuns]);
</script>

<style scoped>
.h-layout {
  height: 100%;
  width: 100%;
}
</style>
