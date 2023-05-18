<script setup lang="ts">
import type { bannerDetail } from '@/utils/parameter'

const props = defineProps<{
    banner: Array<bannerDetail>
}>()
</script>

<template>
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
        <van-swipe-item v-for="b in props.banner" :key="b.id">
            <img :src="b.bannerPoster" class="auto-img">
        </van-swipe-item>
    </van-swipe>
</template>


<style lang="scss" scoped>
.my-swipe .van-swipe-item {
    color: #fff;
    height: 150rem;
    text-align: center;

    .auto-img {
        width: 100%;
        height: 100%;
        display: inline-block;
    }
}
</style>