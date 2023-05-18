<script setup lang="ts">
import { RouterView } from 'vue-router'
import { toRefs } from 'vue';
import { useTabState } from "@/stores/tabState"

const { tabState } = toRefs(useTabState())

</script>

<template>
  <RouterView />
  <van-tabbar route active-color="var(--nav-red)" inactive-color="var(--nav-gay)" :placeholder="true" v-show="tabState">
    <van-tabbar-item replace to="/" icon="wap-home">首页</van-tabbar-item>
    <van-tabbar-item replace to="/magazine" icon="column">杂志</van-tabbar-item>
    <van-tabbar-item replace to="/mine" icon="printer">我的</van-tabbar-item>
    <van-tabbar-item replace to="/bank" icon="manager">账号</van-tabbar-item>
  </van-tabbar>
</template>

<style scoped></style>
