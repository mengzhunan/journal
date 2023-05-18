<script setup lang="ts">
import type { recommendOperation } from '@/utils/parameter'

const props = defineProps<{
    data: recommendOperation,
    num: number
}>()
</script>

<template>
    <van-image radius="3rem" width="108rem" height="150rem" lazy-load :src="props.data.posterz" />
    <div class="txt van-ellipsis" v-if="props.num == 1">{{ props.data.name }}</div>
    <div class="time">{{ props.data.year }}年{{ props.data.issue }}期</div>
</template>


<style scoped>
.txt {
    width: 108rem;
    font-size: 14rem;
    margin-top: 10rem;
    color: #000;
    font-weight: 600;
}

.time {
    padding: 6rem 0 0;
    width: 108rem;
    font-size: 12rem;
    color: #b6b6b6;
    font-weight: 600;
}
</style>